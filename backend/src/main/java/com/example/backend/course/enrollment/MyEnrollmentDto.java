package com.example.backend.course.enrollment;

import com.example.backend.model.EnrollmentEntity;
import com.example.backend.model.enums.Category;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

public record MyEnrollmentDto(
        String id,
        Integer progress,
        List<String> completedLessons,
        LocalDateTime enrolledAt,
        CourseSummary course
) {
    public record CourseSummary(
            String id,
            String title,
            String imageUrl,
            Integer price,
            Category category,
            List<ModuleSummary> modules
    ) {}

    public record ModuleSummary(
            String id,
            String title,
            Integer order,
            List<LessonSummary> lessons
    ) {}

    public record LessonSummary(
            String id,
            String title,
            Integer order
    ) {}

    public static MyEnrollmentDto fromEntity(EnrollmentEntity e) {
        CourseSummary course = null;

        if (e.getCourse() != null) {
            var c = e.getCourse();
            List<ModuleSummary> modules = c.getModuleEntities() == null ? List.of() : c.getModuleEntities().stream()
                    .sorted(Comparator.comparing(m -> m.getOrder() != null ? m.getOrder() : 0))
                    .map(m -> new ModuleSummary(
                            m.getId(),
                            m.getTitle(),
                            m.getOrder(),
                            m.getLessonEntities() == null ? List.of() : m.getLessonEntities().stream()
                                    .sorted(Comparator.comparing(l -> l.getOrder() != null ? l.getOrder() : 0))
                                    .map(l -> new LessonSummary(l.getId(), l.getTitle(), l.getOrder()))
                                    .toList()
                    ))
                    .toList();

            course = new CourseSummary(
                    c.getId(),
                    c.getTitle(),
                    c.getImageUrl(),
                    c.getPrice(),
                    c.getCategory(),
                    modules
            );
        }

        return new MyEnrollmentDto(
                e.getId(),
                e.getProgress(),
                e.getCompletedLessons() == null ? List.of() : e.getCompletedLessons(),
                e.getEnrolledAt(),
                course
        );
    }
}
