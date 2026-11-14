package com.example.backend.course;

import com.example.backend.model.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, String> {
    Optional<CourseEntity> findById(String id);

    @Query("select e.courseId, count(e) from EnrollmentEntity e group by e.courseId")
    List<Object[]> countEnrollmentsPerCourse();
}