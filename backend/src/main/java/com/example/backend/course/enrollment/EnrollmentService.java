package com.example.backend.course.enrollment;

import com.example.backend.course.CourseRepository;
import com.example.backend.model.EnrollmentEntity;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;

    public List<EnrollmentDto> findAllEnrollments() {
        List<EnrollmentEntity> allEnrollments = enrollmentRepository.findAllWithCourse();

        return allEnrollments.stream()
                .map(EnrollmentDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<MyEnrollmentDto> findMyEnrollments(String userId) {
        return enrollmentRepository.findByUserIdOrderByEnrolledAtDesc(userId).stream()
                .map(MyEnrollmentDto::fromEntity)
                .toList();
    }

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