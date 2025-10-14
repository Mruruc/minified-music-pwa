import ItemNotFound from "@/components/common/ItemNotFound";
import { TrackCard } from "@/components/TrackCard";
import { useMusic } from "@/context/MusicContext";
import { Album } from "@/types";
import { formatDuration } from "@/utils/util";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const BASE_URI = import.meta.env.VITE_API_BASE_URL;

const AlbumPage = () => {
  const { id } = useParams<{ id: string }>();
  const { playTrack } = useMusic();

  const [album, setAlbum] = useState<Album>();

  useEffect(() => {
    const getAlbum = async () => {
      const response = await fetch(`${BASE_URI}/albums/${id}`);
      const data = await response.json();
      setAlbum(data);
    };
    getAlbum();
  }, [id]);

  if (!album) {
    return <ItemNotFound />;
  }

  const totalDuration = album.tracks.reduce(
    (acc, track) => acc + track.durationMs,
    0
  );

  return (
    <div className="w-full">
      {/* Album Header */}
      <section className="relative bg-gradient-to-b from-primary/30 to-background px-8 pt-20 pb-8">
        <div className="flex items-end gap-6">
          <img
            src={album.coverUrl}
            alt={album.title}
            className="w-48 h-48 rounded object-cover shadow-2xl"
          />
          <div className="flex-1">
            <p className="text-sm font-medium mb-2">ALBUM</p>
            <h1 className="text-6xl font-bold mb-4">{album.title}</h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium">{album.artistName}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{album.releaseYear}</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {album.tracks.length} songs
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">
                {formatDuration(totalDuration)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Play Button */}
      <section className="px-8 py-8">
        <button
          onClick={() =>
            album.tracks.length > 0 && playTrack(album.tracks[0], album.tracks)
          }
          className="w-14 h-14 bg-accent rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
          <Play className="w-6 h-6 fill-current ml-1" />
        </button>
      </section>

      {/* Track List */}
      <section className="px-8 py-4">
        <div className="max-w-4xl">
          {album.tracks.map((track, index) => (
            <TrackCard key={track.id} track={track} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AlbumPage;
