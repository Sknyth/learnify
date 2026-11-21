package com.example.backend.course;

import com.example.backend.model.CourseEntity;
import com.example.backend.model.enums.StatusCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, String> {
    Optional<CourseEntity> findById(String id);

    Optional<CourseEntity> findByIdAndStatus(String id, StatusCourse status);

    @EntityGraph(attributePaths = "instructor")
    List<CourseEntity> findAllByStatus(StatusCourse status);

    @EntityGraph(attributePaths = "instructor")
    List<CourseEntity> findAllByInstructor_Id(String instructorId);

    @Query("""
            select new com.example.backend.course.AdminCourseSummaryDto(c.id, c.title, i.name, c.studentsCount, c.status)
            from CourseEntity c left join c.instructor i
            """)
    List<AdminCourseSummaryDto> findAllSummaries();

    boolean existsByInstructor_Id(String instructorId);

    @EntityGraph(attributePaths = "instructor")
    List<CourseEntity> findAll();

    @Query("select e.courseId, count(e) from EnrollmentEntity e group by e.courseId")
    List<Object[]> countEnrollmentsPerCourse();
}
