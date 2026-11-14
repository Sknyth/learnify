package com.example.backend.course.enrollment;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/enrollment")
@RequiredArgsConstructor
public class EnrollmentController {
    private final EnrollmentService enrollmentService;

    @PostMapping("/enroll")
    public ResponseEntity<EnrollmentDto> enroll(@RequestBody Map<String, String> request, Authentication auth) {
        String userId = (String) auth.getPrincipal();
        String courseId = request.get("courseId");
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(enrollmentService.enroll(userId,courseId));
    }
}