package com.example.backend.course.enrollment;

import com.example.backend.model.EnrollmentEntity;
import com.example.backend.model.enums.StatusCourse;
import com.example.backend.model.enums.StatusEnrollment;

import java.time.LocalDateTime;

public record OrderEnrollmentDto(
        String id,
        CourseSummary course,
        LocalDateTime enrolledAt,
        StatusEnrollment status
) {
    public record CourseSummary(String id, String title, Integer price, StatusCourse status) {}

    public static OrderEnrollmentDto fromEntity(EnrollmentEntity e) {
        CourseSummary course = e.getCourse() == null ? null
                : new CourseSummary(
                e.getCourse().getId(),
                e.getCourse().getTitle(),
                        e.getCourse().getPrice(),
                        e.getCourse().getStatus());

        return new OrderEnrollmentDto(
                e.getId(),
                course,
                e.getEnrolledAt(),
                StatusEnrollment.Paid
        );
    }
}
