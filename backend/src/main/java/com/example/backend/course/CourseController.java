package com.example.backend.course;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;

    @GetMapping
    public List<CourseDto> getAllCourses() {
        return courseService.findAllCourses();
    }

    @GetMapping("/mine")
    public List<CourseDto> getMyCourses(Authentication auth) {
        return courseService.findMyCourses((String) auth.getPrincipal());
    }

    @GetMapping("/sales")
    @PreAuthorize("hasRole('ADMIN')")
    public List<CourseSalesDto> sales() {
        return courseService.findSales();
    }

    @GetMapping("/{id}")
    public CourseDetailDto getCourse(@PathVariable String id) {
        return courseService.findDetail(id);
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id, Authentication auth) {
        courseService.delete((String) auth.getPrincipal(), id);
        return ResponseEntity.noContent().build();
    }
}
