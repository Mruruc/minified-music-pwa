package com.mr.uruc.minify.music.dto;

import java.time.Instant;
import java.util.List;

public record Playlist(
        String id,
        String title,
        String userId,
        Instant createdAt,
        boolean isOffline,
        String description,
        String coverUrl,
        List<Track> tracks
) {

    public int trackCount() {
        return tracks == null ? 0 : tracks.size();
    }

    public long totalDurationMs() {
        return tracks == null ? 0L : tracks.stream().mapToLong(Track::durationMs).sum();
    }
}
