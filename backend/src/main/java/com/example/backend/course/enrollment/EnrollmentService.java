package com.example.backend.course.enrollment;

import com.example.backend.course.CourseRepository;
import com.example.backend.course.lesson.LessonRepository;
import com.example.backend.model.EnrollmentEntity;
import org.springframework.security.access.AccessDeniedException;
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
    private final LessonRepository lessonRepository;

    public List<EnrollmentDto> findAllEnrollments() {
        List<EnrollmentEntity> allEnrollments = enrollmentRepository.findAllWithCourse();

        return allEnrollments.stream()
                .map(EnrollmentDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public boolean isEnrolled(String userId, String courseId) {
        return enrollmentRepository.existsByUserIdAndCourseId(userId, courseId);
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

    @Transactional
    public EnrollmentDto completeLesson(String userId, String courseId, String lessonId) {
        if (courseId == null || courseId.isBlank() || lessonId == null || lessonId.isBlank())
            throw new IllegalArgumentException("lessonId and courseId are required");

        EnrollmentEntity enrollment = enrollmentRepository.findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new AccessDeniedException("Not enrolled"));

        if (lessonRepository.countInCourse(lessonId, courseId) == 0)
            throw new RuntimeException("Lesson not found in this course");

        List<String> completed = enrollment.getCompletedLessons() == null
                ? new ArrayList<>()
                : new ArrayList<>(enrollment.getCompletedLessons());

        if (completed.contains(lessonId))
            return EnrollmentDto.fromEntity(enrollment);

        long total = lessonRepository.countByCourse(courseId);

        completed.add(lessonId);
        int progress = total == 0 ? 0 : (int) Math.min(100, Math.round(completed.size() * 100.0 / total));

        enrollment.setCompletedLessons(completed);
        enrollment.setProgress(progress);

        return EnrollmentDto.fromEntity(enrollmentRepository.save(enrollment));
    }

    @Transactional(readOnly = true)
    public List<OrderEnrollmentDto> findMyOrdersEnrollments(String userId) {
        return enrollmentRepository.findByUserIdOrderByEnrolledAtDesc(userId).stream()
                .map(OrderEnrollmentDto::fromEntity)
                .toList();
    }
}
