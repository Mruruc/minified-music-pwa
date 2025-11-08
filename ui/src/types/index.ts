export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  followers?: number;
  albums: Album[];
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  coverUrl: string;
  releaseYear: number;
  artistName?: string;
  tracks: Track[];
}

export interface Track {
  id: string;
  title: string;
  albumId: string;
  artistId: string;
  durationMs: number;
  audioUrl: string;
  offlineAvailable: boolean;
  artistName?: string;
  albumCover?: string;
  playedAt?: number;
}

export interface Playlist {
  id: string;
  title: string;
  userId: string;
  createdAt: string;
  isOffline: boolean;
  description?: string;
  coverUrl?: string;
  tracks: Track[];
  trackCount?: number;
  totalDurationMs?: number;
}

export interface MusicLibrary {
  artists: Artist[];
  albums: Album[];
  playlists: Playlist[];
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  queue: Track[];
}
