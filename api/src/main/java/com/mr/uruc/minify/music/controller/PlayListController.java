package com.mr.uruc.minify.music.controller;

import com.mr.uruc.minify.music.db.StaticDB;
import com.mr.uruc.minify.music.dto.Playlist;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/playlists")
public class PlayListController {

    @GetMapping("/{id}")
    public Playlist getAllPlaylist(@PathVariable String id) {
        System.out.println("Fetching playlist with id: " + id);
        return StaticDB.PLAYLISTS.stream()
                .filter(playlist -> playlist.id().equals(id))
                .findFirst()
                .orElse(null);
    }


}
