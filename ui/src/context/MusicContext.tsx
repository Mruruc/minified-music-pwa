import { PlayerState, Track } from "@/types";
import React, { createContext } from "react";

interface MusicContextType {
  offlineQueue: Track[];
  playerState: PlayerState;
  playTrack: (track: Track, newQueue?: Track[]) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  seekTo: (time: number) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export const defaultPlayerState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  volume: 0.7,
  currentTime: 0,
  duration: 0,
  queue: [],
};

export const MusicContext = createContext<MusicContextType | undefined>(
  undefined
);

export const useMusic = (): MusicContextType => {
  const context = React.useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
