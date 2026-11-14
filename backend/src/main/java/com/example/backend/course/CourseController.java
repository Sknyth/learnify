package com.example.backend.course;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @GetMapping("/sales")
    @PreAuthorize("hasRole('ADMIN')")
    public List<CourseSalesDto> sales() {
        return courseService.findSales();
    }
}
