package com.mr.uruc.minify.music.controller;

import com.mr.uruc.minify.music.db.StaticDB;
import com.mr.uruc.minify.music.dto.Album;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/albums")
public class AlbumController {

    @GetMapping("/{id}")
    public Album getAllAlbum(@PathVariable String id) {
        return StaticDB.ALBUMS.stream()
                .filter(album -> album.id().equals(id))
                .findFirst()
                .orElse(null);
    }

}
