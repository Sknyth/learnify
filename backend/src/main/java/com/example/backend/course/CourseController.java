package com.example.backend.course;

import com.example.backend.course.lesson.LessonDto;
import com.example.backend.course.lesson.LessonEditDto;
import com.example.backend.model.enums.StatusCourse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;

    @GetMapping
    public List<CourseDto> getPublishedCourses() {
        return courseService.findPublishedCourses();
    }

    @GetMapping("/mine")
    public List<CourseDto> getMyCourses(Authentication auth) {
        return courseService.findMyCourses((String) auth.getPrincipal());
    }

    @GetMapping("/admin/summary")
    public List<AdminCourseSummaryDto> getAdminCourseSummaries(Authentication auth) {
        return courseService.findAdminCourseSummaries((String) auth.getPrincipal());
    }

    @GetMapping("/sales")
    public List<CourseSalesDto> sales() {
        return courseService.findSales();
    }

    @GetMapping("/{id}")
    public CourseDetailDto<LessonDto> getCourse(@PathVariable String id) {
        return courseService.findPublishedDetail(id);
    }

    @GetMapping("/{id}/edit")
    public CourseDetailDto<LessonEditDto> getCourseForEditing(@PathVariable String id, Authentication auth) {
        return courseService.findDetailForEditing((String) auth.getPrincipal(), id);
    }

    @PostMapping
    public ResponseEntity<CourseDto> create(@RequestBody CourseFormRequest req, Authentication auth) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(courseService.create((String) auth.getPrincipal(), req));
    }

    @PutMapping("/{id}")
    public CourseDto update(@PathVariable String id, @RequestBody CourseFormRequest req, Authentication auth) {
        return courseService.update((String) auth.getPrincipal(), id, req);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> updateStatus(@PathVariable String id,
                                             @Valid @RequestBody StatusRequest request, Authentication auth) {
        courseService.updateStatus((String) auth.getPrincipal(), id, StatusCourse.valueOf(request.status()));
        return ResponseEntity.noContent().build();
    }

    public record StatusRequest(@NotNull String status) {}

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id, Authentication auth) {
        courseService.delete((String) auth.getPrincipal(), id);
        return ResponseEntity.noContent().build();
    }
}
