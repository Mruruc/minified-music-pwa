import { Artist } from '@/types';
import { useNavigate } from 'react-router';

interface ArtistCardProps {
  artist: Artist;
}

export const ArtistCard = ({ artist }: ArtistCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="group bg-card rounded-lg p-4 hover:bg-secondary/50 transition-all cursor-pointer"
      onClick={() => navigate(`/artist/${artist.id}`)}
    >
      <div className="mb-4">
        <img
          src={artist.imageUrl}
          alt={artist.name}
          className="w-full aspect-square object-cover rounded-full"
        />
      </div>

      <h3 className="font-semibold text-lg mb-1 truncate text-center">{artist.name}</h3>
      <p className="text-sm text-muted-foreground text-center">Artist</p>
    </div>
  );
};
