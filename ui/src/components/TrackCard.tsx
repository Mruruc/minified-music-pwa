import { useMusic } from "@/context/MusicContext";
import { Track } from "@/types";
import { formatDuration } from "@/utils/format";
import { Pause, Play } from "lucide-react";

interface TrackCardProps {
  track: Track;
  index?: number;
}

export const TrackCard = ({ track, index }: TrackCardProps) => {
  const { playerState, playTrack, pauseTrack, resumeTrack } = useMusic();
  const isCurrentTrack = playerState.currentTrack?.id === track.id;
  const isPlaying = isCurrentTrack && playerState.isPlaying;

  const handlePlayPause = () => {
    if (isCurrentTrack) {
      isPlaying ? pauseTrack() : resumeTrack();
    } else {
      playTrack(track);
    }
  };

  return (
    <div
      className="group flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/80 transition-all cursor-pointer"
      onClick={handlePlayPause}>
      <div className="relative flex-shrink-0">
        {index !== undefined && (
          <span className="text-muted-foreground text-sm w-6 text-center block group-hover:hidden">
            {index + 1}
          </span>
        )}
        <button
          className={`${
            index !== undefined ? "hidden group-hover:flex" : "flex"
          } items-center justify-center w-6 h-6 rounded-full bg-primary hover:bg-primary/90 transition-colors`}>
          {isPlaying ? (
            <Pause className="w-3 h-3 fill-current" />
          ) : (
            <Play className="w-3 h-3 fill-current ml-0.5" />
          )}
        </button>
      </div>

      {track.albumCover && (
        <img
          src={track.albumCover}
          alt={track.title}
          className="w-12 h-12 rounded object-cover"
        />
      )}

      <div className="flex-1 min-w-0">
        <h4
          className={`font-medium truncate ${
            isCurrentTrack ? "text-primary" : ""
          }`}>
          {track.title}
        </h4>
        <p className="text-sm text-muted-foreground truncate">
          {track.artistName}
        </p>
      </div>

      <span className="text-sm text-muted-foreground">
        {formatDuration(track.durationMs)}
      </span>
    </div>
  );
};
