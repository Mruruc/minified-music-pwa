import { getAllTracks } from "@/lib/utils";
import { Track } from "@/types";
import { useCallback, useEffect, useState } from "react";

const SYNC_TRACK = "SYNC_LAST_PLAYED";

function postToServiceWorker(payload: any) {
  if (navigator.serviceWorker?.controller) {
    navigator.serviceWorker.controller.postMessage(payload);
    return true;
  }
  return false;
}

/**
 * Sends a message to the service worker to cache the last played track.
 */
export const useLastPlayedCache = () => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>();
  const [offlineQueue, setOfflineQueue] = useState<Track[]>([]);

  const cacheTrack = useCallback((trackUrl: string) => {
    postToServiceWorker({
      type: "CACHE_TRACK",
      trackUrl,
    });
  }, []);

  useEffect(() => {
    if (currentTrack?.audioUrl) {
      cacheTrack(currentTrack.audioUrl);

      setOfflineQueue((prev) => {
        return [
          { ...currentTrack, playedAt: Date.now() },
          ...prev.filter((track) => track.id !== currentTrack.id),
        ];
      });
    }
  }, [currentTrack, cacheTrack]);

  // listen onoffline and beforeunload sync tracks metaData to indexDB
  useEffect(() => {
    const onOffline = () => {
      const snapshot = offlineQueue.slice();
      postToServiceWorker({
        type: SYNC_TRACK,
        tracks: snapshot,
        reason: "offline",
      });
    };
    const onUnload = () => {
      const snapshot = offlineQueue.slice();
      postToServiceWorker({
        type: SYNC_TRACK,
        tracks: snapshot,
        reason: "unload",
      });
    };

    window.addEventListener("offline", onOffline);
    window.addEventListener("beforeunload", onUnload);

    return () => {
      window.removeEventListener("offline", onOffline);
      window.removeEventListener("beforeunload", onUnload);
    };
  }, []);

  // hydrate queue from indexDB and setOfflineQueue
  useEffect(() => {
    getAllTracks().then((tracks) => {
      const sorted = tracks.sort((a, b) => b.playedAt - a.playedAt);
      setOfflineQueue(sorted);
    });
  }, []);

  return {
    offlineQueue,
    setCurrentTrack,
  };
};
