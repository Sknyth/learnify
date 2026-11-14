package com.example.backend.course;

import com.example.backend.model.Lesson;

public record LessonDto(String id, String title, Integer order) {
    public static LessonDto fromEntity(Lesson l) {
        return new LessonDto(l.getId(), l.getTitle(), l.getOrder());
    }
}