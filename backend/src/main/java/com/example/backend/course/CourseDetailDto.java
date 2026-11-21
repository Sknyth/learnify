package com.example.backend.course;

import com.example.backend.model.CourseEntity;
import com.example.backend.model.ModuleEntity;
import com.example.backend.model.enums.Category;
import com.example.backend.model.enums.Level;
import com.example.backend.model.enums.StatusCourse;

import java.util.Comparator;
import java.util.List;

public record CourseDetailDto(
        String id,
        String title,
        String instructor,
        String instructorId,
        String description,
        Category category,
        Level level,
        Integer price,
        String duration,
        String imageUrl,
        Double rating,
        Integer reviewsCount,
        Long studentsCount,
        List<String> learningPoints,
        List<ModuleDto> modules,
        StatusCourse status
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
                c.getInstructor() == null ? null : c.getInstructor().getName(),
                c.getInstructor() == null ? null : c.getInstructor().getId(),
                c.getDescription(),
                c.getCategory(),
                c.getLevel(),
                c.getPrice(),
                c.getDuration(),
                c.getImageUrl(),
                c.getRating(),
                c.getReviewsCount(),
                c.getStudentsCount(),
                c.getLearningPoints() == null ? List.of() : c.getLearningPoints(),
                modules,
                c.getStatus()
        );
    }
}
