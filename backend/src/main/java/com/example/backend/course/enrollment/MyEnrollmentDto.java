package com.example.backend.course.enrollment;

import com.example.backend.course.CourseDetailDto;
import com.example.backend.model.EnrollmentEntity;

import java.time.LocalDateTime;
import java.util.List;

public record MyEnrollmentDto(
        String id,
        Integer progress,
        List<String> completedLessons,
        LocalDateTime enrolledAt,
        CourseDetailDto course
) {
    public static MyEnrollmentDto fromEntity(EnrollmentEntity e) {
        return new MyEnrollmentDto(
                e.getId(),
                e.getProgress(),
                e.getCompletedLessons(),
                e.getEnrolledAt(),
                CourseDetailDto.fromEntity(e.getCourse()));
    }
}