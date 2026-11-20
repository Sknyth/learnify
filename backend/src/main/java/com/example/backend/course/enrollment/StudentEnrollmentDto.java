package com.example.backend.course.enrollment;

import com.example.backend.model.EnrollmentEntity;
import com.example.backend.model.enums.Status;

import java.time.LocalDateTime;

public record StudentEnrollmentDto(
        String id,
        UserSummary user,
        CourseSummary course,
        LocalDateTime enrolledAt,
        Integer progress
) {
    public record CourseSummary(String id, String title, Integer price) {}
    public record UserSummary(String id,String name) {}

    public static StudentEnrollmentDto fromEntity(EnrollmentEntity e) {
        CourseSummary course = e.getCourse() == null ? null
                : new CourseSummary(
                        e.getCourse().getId(),
                        e.getCourse().getTitle(),
                        e.getCourse().getPrice()
                );

        UserSummary user = e.getUserEntity() == null ? null
                : new UserSummary(
                        e.getUserId(),
                        e.getUserEntity().getName());

        return new StudentEnrollmentDto(
                e.getId(),
                user,
                course,
                e.getEnrolledAt(),
                e.getProgress()
        );
    }
}