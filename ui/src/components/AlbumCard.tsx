import { Album } from "@/types";
import { Play } from "lucide-react";
import { useNavigate } from "react-router";

interface AlbumCardProps {
  album: Album;
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="group relative bg-card rounded-lg p-4 hover:bg-secondary/50 transition-all cursor-pointer"
      onClick={() => navigate(`/album/${album.id}`)}>
      <div className="relative mb-4">
        <img
          src={album.coverUrl}
          alt={album.title}
          className="w-full aspect-square object-cover rounded-md"
        />
        <button
          className="absolute bottom-2 right-2 w-12 h-12 bg-accent rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-lg translate-y-2 group-hover:translate-y-0"
          onClick={(e) => {
            e.stopPropagation();
          }}>
          <Play className="w-5 h-5 fill-current ml-0.5" />
        </button>
      </div>

      <h3 className="font-semibold text-lg mb-1 truncate">{album.title}</h3>
      <p className="text-sm text-muted-foreground truncate">
        {album.artistName} • {album.releaseYear}
      </p>
    </div>
  );
};
