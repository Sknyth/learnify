package com.example.backend.course;

import com.example.backend.model.CourseEntity;
import com.example.backend.model.enums.Category;
import com.example.backend.model.enums.Level;

import java.time.LocalDateTime;
import java.util.List;

public record CourseDto(
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
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
    public static CourseDto fromEntity(CourseEntity course) {
        if (course == null) {
            return null;
        }

        return new CourseDto(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getCategory(),
                course.getLevel(),
                course.getPrice(),
                course.getDuration(),
                course.getImageUrl(),
                course.getRating(),
                course.getReviewsCount(),
                course.getStudentsCount(),
                course.getLearningPoints(),
                course.getCreatedAt(),
                course.getUpdatedAt()
        );
    }
}