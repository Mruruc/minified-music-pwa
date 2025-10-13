// Versioned cache name - increment on new deployment
const STATIC_ASSETS_CACHE = "minify-music-v1";

const AUDIO_CACHE = "minify-last-played-v1";
const MAX_CACHED_TRACKS = 10;

// List of static assets to pre-cache
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
  "/assets/index-DPb-dSGb.js",
  "/assets/index-Iz21vl38.css",
];

// ----------------------------------
// Install Event - Pre-cache static assets
// ----------------------------------
self.addEventListener("install", (event) => {
  event.waitUntil(preCacheAssets());
  self.skipWaiting(); // Activate SW immediately
});

async function preCacheAssets() {
  const cache = await caches.open(STATIC_ASSETS_CACHE);
  await cache.addAll(urlsToCache);
}

// ----------------------------------
// Activate event - clean up old caches
// ----------------------------------
self.addEventListener("activate", (event) => {
  event.waitUntil(cleanOldCaches());
  self.clients.claim(); // Take control of clients immediately
});

async function cleanOldCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames
      .filter((name) => ![STATIC_ASSETS_CACHE, AUDIO_CACHE].includes(name))
      .map((name) => caches.delete(name))
  );
}
// ----------------------------------
// Fetch event - serve cached assets only for urlsToCache
// ----------------------------------

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  if (isPreCached(requestUrl.pathname)) {
    event.respondWith(handlePreCachedRequest(event.request));
  }
  if (requestUrl.pathname.endsWith(".mp3")) {
    event.respondWith(fetchAudio(event.request));
  }
});

async function fetchAudio(request) {
  const cache = await caches.open(AUDIO_CACHE);
  try {
    const cachedAudio = await cache.match(request);
    if (cachedAudio) return cachedAudio;
    return fetch(request);
  } catch (error) {
    if (request.mode === "navigate") {
      return caches.match("/index.html");
    }
    throw err;
  }
}

/**
 * Checks if a given path is in urlsToCache
 * @param {string} path
 * @returns {boolean}
 */
function isPreCached(path) {
  return urlsToCache.includes(path);
}

/**
 * Handles fetch requests for pre-cached assets
 * @param {Request} request
 * @returns {Promise<Response>}
 */
async function handlePreCachedRequest(request) {
  const cache = await caches.open(STATIC_ASSETS_CACHE);

  const cachedResponse = await cache.match(request);
  if (cachedResponse) return cachedResponse;

  try {
    const networkResponse = await fetch(request);
    cache.put(request, networkResponse.clone());
    return networkResponse;
  } catch (err) {
    if (request.mode === "navigate") {
      return caches.match("/index.html");
    }
    throw err;
  }
}

// -------------------------
// MESSAGE: Cache tracks from main thread
// -------------------------

self.addEventListener("message", async (event) => {
  const data = event.data || {};
  const { type } = data;

  switch (type) {
    case "CACHE_TRACK":
      if (data.trackUrl) await cacheAudioTrack(data.trackUrl);
      break;

    case "SYNC_LAST_PLAYED":
      if (data.tracks?.length) {
        await saveMetadataToDB(data.tracks);
        console.log("[SW] Synced metadata due to:", data.reason);
      }
      break;

    default:
      break;
  }
});

async function cacheAudioTrack(trackUrl) {
  try {
    const cache = await caches.open(AUDIO_CACHE);
    const existing = await cache.match(trackUrl);
    if (existing) return;

    const response = await fetch(trackUrl);
    if (!response.ok) throw new Error("Network fetch failed");

    await cache.put(trackUrl, response.clone());

    await trimTrackCache(cache);
    console.log("[SW] Cached last played track:", trackUrl);
  } catch (err) {
    console.warn("[SW] Failed to cache track:", err);
  }
}

async function trimCache(cache) {
  const keys = await cache.keys();

  if (keys.length > MAX_CACHED_TRACKS) {
    const toDelete = keys.length - MAX_CACHED_TRACKS;
    for (let i = 0; i < toDelete; i++) {
      await cache.delete(keys[i]);
    }
  }
}

// -------------------------
// IndexedDB metadata store
// -------------------------
const DB_NAME = "lastPlayedDB";
const STORE_NAME = "tracks";

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Save and limit to the 10 most recent tracks
 */
async function saveMetadataToDB(tracks) {
  const db = await openDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.objectStore(STORE_NAME);

  // STEP 1: Save all incoming tracks (these are most recent)
  for (const track of tracks) {
    // Attach timestamp if not provided
    const enriched = { ...track, playedAt: track.playedAt || Date.now() };
    store.put(enriched);
  }

  // STEP 2: After saving, trim to 10 most recent
  const allTracks = await new Promise((resolve, reject) => {
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });

  // Sort by most recent first
  allTracks.sort((a, b) => b.playedAt - a.playedAt);

  // Keep top 10
  const toKeep = allTracks.slice(0, MAX_METADATA);
  const toDelete = allTracks.slice(MAX_METADATA);

  // Delete older tracks
  for (const track of toDelete) {
    store.delete(track.id);
  }

  await tx.done?.catch(() => {});
  db.close();

  console.log(`[SW] IndexedDB trimmed to ${toKeep.length} recent tracks`);
}
