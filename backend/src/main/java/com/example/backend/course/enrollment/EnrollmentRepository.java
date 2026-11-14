package com.example.backend.course.enrollment;

import com.example.backend.model.EnrollmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<EnrollmentEntity, String> {

    boolean existsByUserIdAndCourseId(String userId, String courseId);
}