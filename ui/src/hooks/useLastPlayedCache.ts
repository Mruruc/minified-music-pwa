import { Track } from "@/types";
import { getAllTracks, postToServiceWorker } from "@/utils/util";
import { useCallback, useEffect, useState } from "react";

const SYNC_TRACK = "SYNC_LAST_PLAYED";


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

  // listen onoffline and beforeunload sync tracks metaData to indexDB via posting message to service worker
  useEffect(() => {
    const saveQueueToServiceWorker = () => {
      if (offlineQueue.length === 0) {
        return;
      }
      const snapshot = offlineQueue.slice();
      postToServiceWorker({
        type: SYNC_TRACK,
        tracks: snapshot,
        reason: "background_sync",
      });
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        saveQueueToServiceWorker();
      }
    };

    window.addEventListener("offline", saveQueueToServiceWorker);
    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", saveQueueToServiceWorker);

    return () => {
      window.removeEventListener("offline", saveQueueToServiceWorker);
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", saveQueueToServiceWorker);
    };
  }, [offlineQueue]);

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
