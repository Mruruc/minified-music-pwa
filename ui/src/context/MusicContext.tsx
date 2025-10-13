import { useLastPlayedCache } from "@/hooks/useLastPlayedCache";
import { PlayerState, Track } from "@/types";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

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

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setCurrentTrack,offlineQueue } = useLastPlayedCache();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    volume: 0.7,
    currentTime: 0,
    duration: 0,
    queue: [],
  });

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = playerState.volume;
    }
  }, [playerState.volume]);

  const playTrack = useCallback((track: Track, newQueue?: Track[]) => {
    setPlayerState((prev) => ({
      ...prev,
      currentTrack: track,
      isPlaying: true,
      currentTime: 0,
      queue: newQueue ?? prev.queue,
    }));
  }, []);

  const pauseTrack = useCallback(() => {
    setPlayerState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  const resumeTrack = useCallback(() => {
    setPlayerState((prev) => ({ ...prev, isPlaying: true }));
  }, []);

  const nextTrack = useCallback(() => {
    setPlayerState((prev) => {
      if (!prev.currentTrack) return prev;
      const currentIndex = prev.queue.findIndex(
        (t) => t.id === prev.currentTrack?.id
      );
      const nextIndex = (currentIndex + 1) % prev.queue.length;
      return {
        ...prev,
        currentTrack: prev.queue[nextIndex],
        currentTime: 0,
      };
    });
  }, []);

  const previousTrack = useCallback(() => {
    setPlayerState((prev) => {
      if (!prev.currentTrack) return prev;
      const currentIndex = prev.queue.findIndex(
        (t) => t.id === prev.currentTrack?.id
      );
      const prevIndex =
        currentIndex === 0 ? prev.queue.length - 1 : currentIndex - 1;
      return {
        ...prev,
        currentTrack: prev.queue[prevIndex],
        currentTime: 0,
      };
    });
  }, []);

  const setVolume = useCallback((volume: number) => {
    setPlayerState((prev) => ({ ...prev, volume }));
  }, []);

  const seekTo = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setPlayerState((prev) => ({ ...prev, currentTime: time }));
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setPlayerState((prev) => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || 0,
      }));
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [nextTrack]);

 useEffect(() => {
   if (playerState.currentTrack) {
     setCurrentTrack(playerState.currentTrack);
   }
 }, [playerState.currentTrack, setCurrentTrack]);
  
  return (
    <MusicContext.Provider
      value={{
        offlineQueue,
        playerState,
        playTrack,
        pauseTrack,
        resumeTrack,
        nextTrack,
        previousTrack,
        setVolume,
        seekTo,
        audioRef,
      }}>
      {children}
      <audio ref={audioRef} src={playerState.currentTrack?.audioUrl} />
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
