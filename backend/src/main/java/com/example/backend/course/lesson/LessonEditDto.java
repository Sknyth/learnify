package com.example.backend.course.lesson;

import com.example.backend.model.LessonEntity;

public record LessonEditDto(String id, String title, Integer order, String duration, String videoUrl) {
    public static LessonEditDto fromEntity(LessonEntity lesson) {
        return new LessonEditDto(lesson.getId(), lesson.getTitle(), lesson.getOrder(),
                lesson.getDuration(), lesson.getVideoUrl());
    }
}
