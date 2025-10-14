package com.mr.uruc.minify.music.db;

import com.mr.uruc.minify.music.dto.Album;
import com.mr.uruc.minify.music.dto.Artist;
import com.mr.uruc.minify.music.dto.MusicLibrary;
import com.mr.uruc.minify.music.dto.Playlist;
import com.mr.uruc.minify.music.dto.Track;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

public class StaticDB {
    private static final String baseUrl = ServletUriComponentsBuilder
            .fromCurrentContextPath()
            .path("/api/v1/audios/")
            .toUriString();

    private StaticDB() {
    }

    // ---------------------------
    // 1. Tracks (base level data)
    // ---------------------------
    public static final List<Track> TRACKS = List.of(
            new Track("1", "Cosmic Highway", "1", "1", 245_000,
                    baseUrl + "SoundHelix-Song-1.mp3", true,
                    "The Midnight Collective", "Midnight Echoes",
                    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=800&fit=crop", List.of("1", "3")),

            new Track("2", "Electric Dreams", "1", "1", 198_000,
                    baseUrl + "SoundHelix-Song-2.mp3", true,
                    "The Midnight Collective", "Midnight Echoes",
                    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=800&fit=crop", List.of("2", "3")),

            new Track("3", "Moonlight Serenade", "2", "2", 223_000,
                    baseUrl + "SoundHelix-Song-3.mp3", false,
                    "Luna Rivers", "Starlight Sessions",
                    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop", List.of("1")),

            new Track("4", "Neon Nights", "3", "3", 267_000,
                    baseUrl + "SoundHelix-Song-4.mp3", true,
                    "Neon Dreams", "Retrowave Paradise",
                    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=800&fit=crop", List.of("2")),

            new Track("5", "Sunset Boulevard", "3", "3", 234_000,
                    baseUrl + "SoundHelix-Song-5.mp3", false,
                    "Neon Dreams", "Retrowave Paradise",
                    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=800&fit=crop", List.of("1", "3"))
    );

    // ---------------------------
    // 2. Albums
    // ---------------------------
    public static final List<Album> ALBUMS = List.of(
            new Album("1", "Midnight Echoes", "1", 2024,
                    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=800&fit=crop",
                    "The Midnight Collective",
                    filterTracksByAlbum("1")),

            new Album("2", "Starlight Sessions", "2", 2023,
                    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=800&fit=crop",
                    "Luna Rivers",
                    filterTracksByAlbum("2")),

            new Album("3", "Retrowave Paradise", "3", 2024,
                    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=800&fit=crop",
                    "Neon Dreams",
                    filterTracksByAlbum("3"))
    );

    // ---------------------------
    // 3. Artists
    // ---------------------------
    public static final List<Artist> ARTISTS = List.of(
            new Artist("1", "The Midnight Collective",
                    "Electronic music pioneers blending synthwave with modern production.",
                    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=800&fit=crop",
                    1_234_567,
                    filterAlbumsByArtist("1"), null),
//                    filterTracksByArtist("1")),

            new Artist("2", "Luna Rivers",
                    "Indie pop artist with a soulful voice and introspective lyrics.",
                    "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&h=800&fit=crop",
                    892_345,
                    filterAlbumsByArtist("2"), null),
//                    filterTracksByArtist("2")),

            new Artist("3", "Neon Dreams",
                    "Synthwave duo creating nostalgic 80s inspired soundscapes.",
                    "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&h=800&fit=crop",
                    2_456_789,
                    filterAlbumsByArtist("3"), null)
//                    filterTracksByArtist("3"))
    );

    // ---------------------------
    // 4. Playlists
    // ---------------------------
    public static final List<Playlist> PLAYLISTS = List.of(
            new Playlist("1", "Chill Vibes", "user1",
                    Instant.parse("2024-01-15T00:00:00Z"), true,
                    "Perfect for relaxing evenings",
                    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
                    filterTracksByPlaylist("1")),

            new Playlist("2", "Workout Energy", "user1",
                    Instant.parse("2024-02-01T00:00:00Z"), false,
                    "High energy tracks for your workout",
                    "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
                    filterTracksByPlaylist("2")),

            new Playlist("3", "Focus Flow", "user1",
                    Instant.parse("2024-03-10T00:00:00Z"), true,
                    "Deep focus and productivity",
                    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
                    filterTracksByPlaylist("3"))
    );

    // ---------------------------
    // Utility Filter Methods
    // ---------------------------
    private static List<Track> filterTracksByAlbum(String albumId) {
        return TRACKS.stream()
                .filter(t -> t.albumId().equals(albumId))
                .collect(Collectors.toList());
    }

    private static List<Album> filterAlbumsByArtist(String artistId) {
        return ALBUMS.stream()
                .filter(a -> a.artistId().equals(artistId))
                .collect(Collectors.toList());
    }

    private static List<Track> filterTracksByArtist(String artistId) {
        return TRACKS.stream()
                .filter(t -> t.artistId().equals(artistId))
                .collect(Collectors.toList());
    }

    private static List<Track> filterTracksByPlaylist(String playlistId) {
        return TRACKS.stream()
                .filter(t -> t.playlistIds().contains(playlistId))
                .collect(Collectors.toList());
    }

    // Optional helper: lookups by ID
//    public static Map<String, Artist> ARTIST_MAP =
//            ARTISTS.stream().collect(Collectors.toMap(Artist::id, a -> a));
//    public static Map<String, Album> ALBUM_MAP =
//            ALBUMS.stream().collect(Collectors.toMap(Album::id, a -> a));
//    public static Map<String, Track> TRACK_MAP =
//            TRACKS.stream().collect(Collectors.toMap(Track::id, t -> t));

    public static MusicLibrary getMusicLibrary() {
        var playlists = PLAYLISTS.stream()
                .map(StaticDB::toPlayList)
                .toList();
        var albums = ALBUMS.stream()
                .map(StaticDB::toAlbum)
                .toList();
        var artists = ARTISTS.stream()
                .map(StaticDB::toArtist)
                .toList();
        return new MusicLibrary(artists, albums, playlists);
    }

    private static Artist toArtist(Artist artist) {
        return new Artist(
                artist.id(), artist.name(), artist.bio(), artist.imageUrl(),
                artist.followers(), null, null
        );
    }

    private static Album toAlbum(Album album) {
        return new Album(
                album.id(), album.title(), album.artistId(), album.releaseYear(),
                album.coverUrl(), album.artistName(), null
        );
    }

    private static Playlist toPlayList(Playlist p) {
        return new Playlist(p.id(), p.title(), p.userId(), p.createdAt(),
                p.isOffline(), p.description(), p.coverUrl(), null);
    }
}
