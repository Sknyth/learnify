package com.example.backend.course;

import com.example.backend.model.LessonEntity;
import com.example.backend.model.ModuleEntity;

import java.util.Comparator;
import java.util.List;
import java.util.function.Function;

public record ModuleDto<T>(String id, String title, Integer order, List<T> lessons) {
    public static <T> ModuleDto<T> fromEntity(ModuleEntity m, Function<LessonEntity, T> lessonMapper) {
        return new ModuleDto<>(
                m.getId(),
                m.getTitle(),
                m.getOrder(),
                m.getLessonEntities().stream()
                        .sorted(Comparator.comparing(LessonEntity::getOrder))
                        .map(lessonMapper)
                        .toList());
    }
}