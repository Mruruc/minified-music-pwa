import { Track } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const DB_NAME = "lastPlayedDB";
const STORE_NAME = "tracks";

export async function getAllTracks(): Promise<Track[]> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction("tracks", "readonly");
      const store = tx.objectStore("tracks");
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = () => resolve(getAllRequest.result);
      getAllRequest.onerror = () => reject(getAllRequest.error);
    };

    request.onerror = () => reject(request.error);
  });
}

export async function postToServiceWorker(payload: any) {
  const registration = await navigator.serviceWorker.ready;
  const controller = navigator.serviceWorker.controller || registration.active;

  if (controller) {
    controller.postMessage(payload);
    return true;
  }

  console.warn(
    "[postToServiceWorker] No active service worker to receive message."
  );
  return false;
}

export const formatDuration = (ms: number): string => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
