package com.example.backend.course;

import com.example.backend.model.CourseEntity;
import com.example.backend.model.ModuleEntity;
import com.example.backend.model.enums.Category;
import com.example.backend.model.enums.Level;

import java.util.Comparator;
import java.util.List;

public record CourseDetailDto(
        String id,
        String title,
        String description,
        Category category,
        Level level,
        Integer price,
        String duration,
        String imageUrl,
        Double rating,
        Integer reviewsCount,
        Integer studentsCount,
        List<String> learningPoints,
        List<ModuleDto> modules
) {
    public static CourseDetailDto fromEntity(CourseEntity c) {
        List<ModuleDto> modules = c.getModuleEntities() == null
                ? List.of()
                : c.getModuleEntities().stream()
                .sorted(Comparator.comparing(ModuleEntity::getOrder,
                        Comparator.nullsLast(Comparator.naturalOrder())))
                .map(ModuleDto::fromEntity)
                .toList();

        return new CourseDetailDto(
                c.getId(),
                c.getTitle(),
                c.getDescription(),
                c.getCategory(),
                c.getLevel(),
                c.getPrice(),
                c.getDuration(),
                c.getImageUrl(),
                c.getRating(),
                c.getReviewsCount(),
                c.getStudentsCount(),
                c.getLearningPoints(),
                modules
        );
    }
}
