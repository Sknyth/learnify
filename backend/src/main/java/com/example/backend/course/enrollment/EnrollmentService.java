package com.example.backend.course.enrollment;

import com.example.backend.course.CourseRepository;
import com.example.backend.model.EnrollmentEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;

    public EnrollmentDto enroll(String userId, String courseId) {

        if (userId == null || userId.isBlank() || courseId == null || courseId.isBlank())
            throw new IllegalArgumentException("UserId and courseId are required");

        if (!courseRepository.existsById(courseId))
            throw new IllegalArgumentException("Course not found");

        if (enrollmentRepository.existsByUserIdAndCourseId(userId, courseId))
            throw new IllegalStateException("Already enrolled");

        EnrollmentEntity enrollment = new EnrollmentEntity();
        enrollment.setId(UUID.randomUUID().toString());
        enrollment.setUserId(userId);
        enrollment.setCourseId(courseId);
        enrollment.setProgress(0);
        enrollment.setCompletedLessons(new ArrayList<>());

        return EnrollmentDto.fromEntity(enrollmentRepository.save(enrollment));
    }
}