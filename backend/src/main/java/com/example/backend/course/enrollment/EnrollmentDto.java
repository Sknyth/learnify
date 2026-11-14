package com.example.backend.course.enrollment;

import com.example.backend.model.EnrollmentEntity;
import java.time.LocalDateTime;
import java.util.List;

public record EnrollmentDto(
        String id,
        String userId,
        String courseId,
        Integer progress,
        List<String> completedLessons,
        LocalDateTime enrolledAt,
        CourseSummary course
) {
    public record CourseSummary(String id, String title, Integer price) {}

    public static EnrollmentDto fromEntity(EnrollmentEntity entity) {
        if (entity == null) {
            return null;
        }

        CourseSummary course = entity.getCourse() == null ? null
                : new CourseSummary(
                entity.getCourse().getId(),
                entity.getCourse().getTitle(),
                entity.getCourse().getPrice());

        return new EnrollmentDto(
                entity.getId(),
                entity.getUserId(),
                entity.getCourseId(),
                entity.getProgress(),
                entity.getCompletedLessons(),
                entity.getEnrolledAt(),
                course
        );
    }
}