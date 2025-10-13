package com.mr.uruc.minify.music.controller;

import com.mr.uruc.minify.music.db.StaticDB;
import com.mr.uruc.minify.music.dto.Artist;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/artists")
public class ArtistController {

    @GetMapping("/{id}")
    public Artist getAllArtist(@PathVariable String id) {
        return StaticDB.ARTISTS.stream()
                .filter(artist -> artist.id().equals(id))
                .findFirst()
                .orElse(null);
    }
}
