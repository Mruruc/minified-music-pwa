package com.mr.uruc.minify.music.dto;

import java.util.List;

// Track N → 1 Artist, N → 1 Album, N ↔ N Playlists
public record Track(
        String id,
        String title,
        String albumId,
        String artistId,
        long durationMs,
        String audioUrl,
        boolean offlineAvailable,
        String artistName,
        String albumTitle,
        String albumCover,
        List<String> playlistIds
) {

    public String durationFormatted() {
        long totalSeconds = durationMs / 1000;
        long minutes = totalSeconds / 60;
        long seconds = totalSeconds % 60;
        return String.format("%d:%02d", minutes, seconds);
    }
}