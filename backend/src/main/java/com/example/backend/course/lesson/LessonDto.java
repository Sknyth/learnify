package com.example.backend.course.lesson;

import com.example.backend.model.LessonEntity;

public record LessonDto(String id, String title, Integer order, String duration, String videoUrl) {
    public static LessonDto fromEntity(LessonEntity l) {
        return new LessonDto(l.getId(), l.getTitle(), l.getOrder(), l.getDuration(), l.getVideoUrl());
    }
}