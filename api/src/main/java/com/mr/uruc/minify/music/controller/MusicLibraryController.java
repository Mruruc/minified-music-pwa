package com.mr.uruc.minify.music.controller;

import com.mr.uruc.minify.music.db.StaticDB;
import com.mr.uruc.minify.music.dto.MusicLibrary;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("api/v1/library")
public class MusicLibraryController {

    @GetMapping
    public MusicLibrary getLibrary() {
        return StaticDB.getMusicLibrary();
    }

}
