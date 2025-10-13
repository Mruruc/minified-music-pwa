import { AlbumCard } from "@/components/AlbumCard";
import { ArtistCard } from "@/components/ArtistCard";
import { PlaylistCard } from "@/components/PlaylistCard";
import { TrackCard } from "@/components/TrackCard";
import { useMusic } from "@/context/MusicContext";
import { MusicLibrary } from "@/types";
import { useEffect, useState } from "react";

const HomePage = () => {
  const { offlineQueue } = useMusic();

  const [lib, setLib] = useState<MusicLibrary>({
    artists: [],
    albums: [],
    playlists: [],
  });

  useEffect(() => {
    const getLib = async () => {
      const response = await fetch("http://localhost:8081/api/v1/library");
      const data = await response.json();
      setLib(data);
    };
    getLib();
  }, []);

  const { artists, albums, playlists } = lib;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/20 to-background px-8 pt-12 pb-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to Minify Music</h1>
        <p className="text-xl text-muted-foreground">
          Discover your next favorite song
        </p>
      </section>

      {/* Featured Playlists */}
      <section className="px-8 py-8">
        <h2 className="text-3xl font-bold mb-6">Featured Playlists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="px-8 py-8">
        <h2 className="text-3xl font-bold mb-6">New Releases</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section className="px-8 py-8">
        <h2 className="text-3xl font-bold mb-6">Popular Artists</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>

      {/* Recently Played */}
      <section className="px-8 py-8">
        <h2 className="text-3xl font-bold mb-6">Recently Played</h2>
        <div className="max-w-4xl">
          {offlineQueue.map((track, index) => (
            <TrackCard key={track.id} track={track} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
