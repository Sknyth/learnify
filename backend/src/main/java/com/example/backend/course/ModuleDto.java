package com.example.backend.course;

import com.example.backend.course.lesson.LessonDto;
import com.example.backend.model.LessonEntity;
import com.example.backend.model.ModuleEntity;

import java.util.Comparator;
import java.util.List;

public record ModuleDto(String id, String title, Integer order, List<LessonDto> lessons) {
    public static ModuleDto fromEntity(ModuleEntity m) {
        return new ModuleDto(
                m.getId(),
                m.getTitle(),
                m.getOrder(),
                m.getLessonEntities().stream()
                        .sorted(Comparator.comparing(LessonEntity::getOrder))
                        .map(LessonDto::fromEntity)
                        .toList());
    }
}