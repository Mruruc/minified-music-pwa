import { useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { useMusic } from '@/context/MusicContext';
import { Slider } from '@/components/ui/slider';
import { formatDuration } from '@/utils/util';

export const Player = () => {
  const {
    playerState,
    pauseTrack,
    resumeTrack,
    nextTrack,
    previousTrack,
    setVolume,
    seekTo,
    audioRef,
  } = useMusic();

  const { currentTrack, isPlaying, volume, currentTime, duration } = playerState;

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play()
      .catch((error) => {
        console.warn(error);
      });
    } else if (audioRef.current && !isPlaying) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrack, audioRef]);

  if (!currentTrack) {
    return null;
  }

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[hsl(var(--player-bg))] border-t border-border px-4 py-3 z-50">
      <div className="max-w-screen-2xl mx-auto flex items-center gap-4">
        {/* Track Info */}
        <div className="flex items-center gap-3 w-80">
          {currentTrack.albumCover && (
            <img
              src={currentTrack.albumCover}
              alt={currentTrack.title}
              className="w-14 h-14 rounded object-cover"
            />
          )}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate text-sm">{currentTrack.title}</h4>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artistName}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="flex items-center gap-4">
            <button
              onClick={previousTrack}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={isPlaying ? pauseTrack : resumeTrack}
              className="w-10 h-10 bg-foreground text-background rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>
            <button
              onClick={nextTrack}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Progress Bar */}
          <div className="w-full max-w-2xl flex items-center gap-2">
            <span className="text-xs text-muted-foreground w-10 text-right">
              {formatDuration(currentTime * 1000)}
            </span>
            <Slider
              value={[progressPercentage]}
              max={100}
              step={0.1}
              className="flex-1"
              onValueChange={([value]) => {
                const newTime = (value / 100) * duration;
                seekTo(newTime);
              }}
            />
            <span className="text-xs text-muted-foreground w-10">
              {formatDuration(duration * 1000)}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2 w-40">
          <button
            onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </button>
          <Slider
            value={[volume * 100]}
            max={100}
            step={1}
            className="flex-1"
            onValueChange={([value]) => setVolume(value / 100)}
          />
        </div>
      </div>
    </div>
  );
};
