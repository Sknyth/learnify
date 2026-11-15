package com.example.backend.course.lesson;

import com.example.backend.model.LessonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LessonRepository extends JpaRepository<LessonEntity, String> {

    @Query("select count(l) from LessonEntity l where l.id = :lessonId and l.moduleEntity.courseId = :courseId")
    long countInCourse(@Param("lessonId") String lessonId, @Param("courseId") String courseId);

    @Query("select count(l) from LessonEntity l where l.moduleEntity.courseId = :courseId")
    long countByCourse(@Param("courseId") String courseId);
}