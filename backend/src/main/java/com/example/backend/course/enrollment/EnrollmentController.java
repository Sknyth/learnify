package com.example.backend.course.enrollment;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@RequiredArgsConstructor
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    @GetMapping
    public List<EnrollmentDto> getAllEnrollments() {
        return enrollmentService.findAllEnrollments();
    }

    @GetMapping("/my")
    public List<MyEnrollmentDto> getMyEnrollments(Authentication auth) {
        return enrollmentService.findMyEnrollments((String) auth.getPrincipal());
    }

    @PostMapping("/enroll")
    public ResponseEntity<EnrollmentDto> enroll(@RequestBody Map<String, String> request, Authentication auth) {
        String userId = (String) auth.getPrincipal();
        String courseId = request.get("courseId");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(enrollmentService.enroll(userId, courseId));
    }

    @PostMapping("/complete-lesson")
    public ResponseEntity<EnrollmentDto> completeLesson(@RequestBody Map<String, String> request, Authentication auth) {
        String userId = (String) auth.getPrincipal();
        return ResponseEntity.ok(
                enrollmentService.completeLesson(userId, request.get("courseId"), request.get("lessonId")));
    }
}