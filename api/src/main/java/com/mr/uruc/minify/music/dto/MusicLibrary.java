package com.mr.uruc.minify.music.dto;

import java.util.List;

public record MusicLibrary(
        List<Artist> artists,
        List<Album> albums,
        List<Playlist> playlists
) {
}
