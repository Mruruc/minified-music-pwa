package com.mr.uruc.minify.music.dto;

import java.util.List;

//Album N → 1 Artist, 1 → N Tracks
public record Album(
        String id,
        String title,
        String artistId,
        int releaseYear,
        String coverUrl,
        String artistName,
        List<Track> tracks
) {
}
