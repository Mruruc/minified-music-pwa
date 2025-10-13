# Minify Music - React + TypeScript Music Streaming App

A modern, scalable music streaming application built with React 19, TypeScript, and Vite.

## 🎵 Features

- **Music Streaming**: Play tracks with a fully functional audio player
- **Artist Pages**: Explore artist profiles with albums and popular tracks
- **Album Views**: Browse albums with complete track listings
- **Playlists**: Create and manage custom playlists
- **Responsive Design**: Beautiful UI that works on all devices
- **Dark Theme**: Eye-friendly dark mode optimized for music apps
- **Type-Safe**: Full TypeScript implementation for reliability

## 🏗️ Architecture

### Project Structure
```
src/
├── components/       # Reusable UI components
│   ├── TrackCard.tsx
│   ├── AlbumCard.tsx
│   ├── ArtistCard.tsx
│   ├── PlaylistCard.tsx
│   └── Player.tsx    # Global audio player
├── pages/           # Page-level components
│   ├── HomePage.tsx
│   ├── ArtistPage.tsx
│   ├── AlbumPage.tsx
│   └── PlaylistPage.tsx
├── context/         # React context for global state
│   └── MusicContext.tsx
├── services/        # Data services
│   └── mockData.ts
├── types/           # TypeScript interfaces
│   └── index.ts
├── utils/           # Utility functions
│   └── format.ts
└── App.tsx
```

### Tech Stack

- **React 19** - UI framework
- **TypeScript 5** - Type safety
- **Vite 7** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **React Context** - State management

### Data Model

