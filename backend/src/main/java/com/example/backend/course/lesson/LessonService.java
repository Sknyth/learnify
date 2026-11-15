package com.example.backend.course.lesson;

import com.example.backend.course.CourseRepository;
import com.example.backend.course.ModuleDto;
import com.example.backend.course.enrollment.EnrollmentRepository;
import com.example.backend.model.CourseEntity;
import com.example.backend.model.EnrollmentEntity;
import com.example.backend.model.LessonEntity;
import com.example.backend.model.ModuleEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LessonService {

    private final LessonRepository lessonRepository;
    private final CourseRepository courseRepository;
    private final EnrollmentRepository enrollmentRepository;

    @Transactional(readOnly = true)
    public LessonPageDto getLessonPage(String userId, String courseId, String lessonId) {
        EnrollmentEntity enrollment = enrollmentRepository.findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new AccessDeniedException("Not enrolled"));

        LessonEntity lesson = lessonRepository.findById(lessonId)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));

        ModuleEntity module = lesson.getModuleEntity();
        if (module == null || !courseId.equals(module.getCourseId()))
            throw new RuntimeException("Lesson not found in this course");

        CourseEntity course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        List<ModuleDto> modules = course.getModuleEntities().stream()
                .sorted(Comparator.comparing(ModuleEntity::getOrder, Comparator.nullsLast(Comparator.naturalOrder())))
                .map(ModuleDto::fromEntity)
                .toList();

        return new LessonPageDto(
                course.getId(),
                new LessonPageDto.LessonInfo(lesson.getId(), lesson.getTitle(), lesson.getVideoUrl()),
                module.getTitle(),
                enrollment.getProgress(),
                enrollment.getCompletedLessons() == null ? new ArrayList<>() : enrollment.getCompletedLessons(),
                modules
        );
    }
}