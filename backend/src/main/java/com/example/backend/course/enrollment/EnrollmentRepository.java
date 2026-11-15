package com.example.backend.course.enrollment;

import com.example.backend.model.EnrollmentEntity;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<EnrollmentEntity, String> {
    @Query("select e from EnrollmentEntity e join fetch e.course")
    List<EnrollmentEntity> findAllWithCourse();

    @EntityGraph(attributePaths = {"course", "course.moduleEntities"})
    List<EnrollmentEntity> findByUserIdOrderByEnrolledAtDesc(String userId);

    boolean existsByUserIdAndCourseId(String userId, String courseId);

    Optional<EnrollmentEntity> findByUserIdAndCourseId(String userId, String courseId);
}