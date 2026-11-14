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
        LocalDateTime enrolledAt
) {
    public static EnrollmentDto fromEntity(EnrollmentEntity entity) {
        if (entity == null) {
            return null;
        }
        return new EnrollmentDto(
                entity.getId(),
                entity.getUserId(),
                entity.getCourseId(),
                entity.getProgress(),
                entity.getCompletedLessons(),
                entity.getEnrolledAt()
        );
    }
}