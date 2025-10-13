package com.mr.uruc.minify.music.dto;

import java.util.List;

// 1 → N Albums, 1 → N Tracks
public record Artist(
        String id,
        String name,
        String bio,
        String imageUrl,
        int followers,
        List<Album> albums,
        List<Track> tracks
) {
}
