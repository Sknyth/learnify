package com.example.backend.course.lesson;

import com.example.backend.course.ModuleDto;

import java.util.List;

public record LessonPageDto(
        String courseId,
        LessonInfo lesson,
        String moduleTitle,
        Integer progress,
        List<String> completedLessons,
        List<ModuleDto<LessonDto>> modules
) {
    public record LessonInfo(String id, String title, String videoUrl) {}
}