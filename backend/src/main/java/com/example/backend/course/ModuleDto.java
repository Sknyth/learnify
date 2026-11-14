package com.example.backend.course;

import com.example.backend.model.Lesson;
import com.example.backend.model.Module;

import java.util.Comparator;
import java.util.List;

public record ModuleDto(String id, String title, Integer order, List<LessonDto> lessons) {
    public static ModuleDto fromEntity(Module m) {
        return new ModuleDto(
                m.getId(),
                m.getTitle(),
                m.getOrder(),
                m.getLessons().stream()
                        .sorted(Comparator.comparing(Lesson::getOrder))
                        .map(LessonDto::fromEntity)
                        .toList());
    }
}