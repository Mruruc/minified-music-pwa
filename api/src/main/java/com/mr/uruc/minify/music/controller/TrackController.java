package com.mr.uruc.minify.music.controller;

import com.mr.uruc.minify.music.dto.Track;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/tracks")
public class TrackController {
    @GetMapping
    public List<Track> getAllTracks() {
        return null;
    }
}
