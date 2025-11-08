import { Track } from "@/types";
import { useCallback, useEffect, useRef } from "react";

interface UseMediaSessionProps {
  currentTrack: Track | null;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (time: number) => void;
  duration: number;
  currentTime: number;
}

export const useMediaSession = ({
  currentTrack,
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrevious,
  onSeek,
  duration,
  currentTime,
}: UseMediaSessionProps) => {
  const isMediaSessionSupported = "mediaSession" in navigator;
  const lastPositionUpdateRef = useRef<number>(0);
  const positionUpdateThrottleMs = 1000;

  const getArtwork = useCallback((albumCover: string | undefined) => {
    if (!albumCover) return [];

    const sizes = [
      "96x96",
      "128x128",
      "192x192",
      "256x256",
      "384x384",
      "512x512",
    ];
    return sizes.map((size) => ({
      src: albumCover,
      sizes: size,
      type: "image/jpeg",
    }));
  }, []);

  
  useEffect(() => {
    if (!isMediaSessionSupported || !currentTrack) return;

    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title || "Unknown Title",
        artist: currentTrack.artistName || "Unknown Artist",
        artwork: getArtwork(currentTrack.albumCover),
      });
    } catch (error) {
      console.warn("Failed to set media session metadata:", error);
    }
  }, [currentTrack, isMediaSessionSupported, getArtwork]);

  useEffect(() => {
    if (!isMediaSessionSupported) return;

    try {
      navigator.mediaSession.playbackState = isPlaying ? "playing" : "paused";
    } catch (error) {
      console.warn("Failed to set playback state:", error);
    }
  }, [isPlaying, isMediaSessionSupported]);

  useEffect(() => {
    if (!isMediaSessionSupported || !duration || !isFinite(duration)) return;

    const now = Date.now();
    if (now - lastPositionUpdateRef.current < positionUpdateThrottleMs) {
      return;
    }

    try {
      const safePosition = Math.min(Math.max(0, currentTime), duration);

      navigator.mediaSession.setPositionState({
        duration: duration,
        playbackRate: 1.0,
        position: safePosition,
      });

      lastPositionUpdateRef.current = now;
    } catch (error) {
      console.warn("Failed to set position state:", error);
    }
  }, [duration, currentTime, isMediaSessionSupported]);

  // Set up action handlers
  useEffect(() => {
    if (!isMediaSessionSupported) return;

    const actionHandlers: Partial<
      Record<MediaSessionAction, MediaSessionActionHandler>
    > = {
      play: () => onPlay(),
      pause: () => onPause(),
      nexttrack: () => onNext(),
      previoustrack: () => onPrevious(),
      seekto: (details) => {
        if (details.seekTime !== undefined && isFinite(details.seekTime)) {
          const safeSeekTime = Math.min(
            Math.max(0, details.seekTime),
            duration
          );
          onSeek(safeSeekTime);
          try {
            navigator.mediaSession.setPositionState({
              duration: duration,
              playbackRate: 1.0,
              position: safeSeekTime,
            });
          } catch (error) {
            console.warn("Failed to update position after seek:", error);
          }
        }
      },
      seekbackward: (details) => {
        const skipTime = details.seekOffset || 10;
        const newTime = Math.max(0, currentTime - skipTime);
        onSeek(newTime);
      },
      seekforward: (details) => {
        const skipTime = details.seekOffset || 10;
        const newTime = Math.min(duration, currentTime + skipTime);
        onSeek(newTime);
      },
      stop: () => {
        onPause();
        onSeek(0);
      },
    };

    Object.entries(actionHandlers).forEach(([action, handler]) => {
      try {
        navigator.mediaSession.setActionHandler(
          action as MediaSessionAction,
          handler
        );
      } catch (error) {
        console.debug(
          `Media session action "${action}" is not supported on this platform.`
        );
      }
    });

    return () => {
      Object.keys(actionHandlers).forEach((action) => {
        try {
          navigator.mediaSession.setActionHandler(
            action as MediaSessionAction,
            null
          );
        } catch (error) {}
      });
    };
  }, [
    isMediaSessionSupported,
    onPlay,
    onPause,
    onNext,
    onPrevious,
    onSeek,
    currentTime,
    duration,
  ]);

  useEffect(() => {
    return () => {
      if (isMediaSessionSupported) {
        try {
          navigator.mediaSession.metadata = null;
          navigator.mediaSession.playbackState = "none";
        } catch (error) {}
      }
    };
  }, [isMediaSessionSupported]);
};
