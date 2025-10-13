import { AlbumCard } from "@/components/AlbumCard";
import ItemNotFound from "@/components/common/ItemNotFound";
import { TrackCard } from "@/components/TrackCard";
import { useMusic } from "@/context/MusicContext";
import { Artist } from "@/types";
import { formatNumber } from "@/utils/format";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const ArtistPage = () => {
  const { id } = useParams<{ id: string }>();
  const { playTrack } = useMusic();

  const [artist, setArtist] = useState<Artist>();

  const artistAlbums = artist?.albums;
  const artistTracks = artist?.albums.flatMap((album) => album.tracks);

  useEffect(() => {
    const getArtist = async () => {
      const response = await fetch(
        `http://localhost:8081/api/v1/artists/${id}`
      );
      const data = await response.json();
      console.log(data);
      setArtist(data);
    };
    getArtist();
  }, [id]);

  if (!artist) {
    return <ItemNotFound />;
  }

  return (
    <div className="w-full">
      {/* Artist Header */}
      <section className="relative bg-gradient-to-b from-primary/30 to-background px-8 pt-20 pb-8">
        <div className="flex items-end gap-6">
          <img
            src={artist.imageUrl}
            alt={artist.name}
            className="w-48 h-48 rounded-full object-cover shadow-2xl"
          />
          <div className="flex-1">
            <p className="text-sm font-medium mb-2">ARTIST</p>
            <h1 className="text-6xl font-bold mb-4">{artist.name}</h1>
            <p className="text-lg text-muted-foreground mb-4">
              {formatNumber(artist.followers || 0)} followers
            </p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="px-8 py-8">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <p className="text-muted-foreground max-w-3xl">{artist.bio}</p>
      </section>

      {/* Play Button */}
      <section className="px-8 py-8">
        <button
          onClick={() =>
            artistTracks.length > 0 && playTrack(artistTracks[0], artistTracks)
          }
          className="w-14 h-14 bg-accent rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg">
          <Play className="w-6 h-6 fill-current ml-1" />
        </button>
      </section>

      {/* Popular Tracks */}
      <section className="px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Popular Tracks</h2>
        <div className="max-w-4xl">
          {artistTracks.map((track, index) => (
            <TrackCard key={track.id} track={track} index={index} />
          ))}
        </div>
      </section>

      {/* Albums */}
      <section className="px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Albums</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {artistAlbums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ArtistPage;
