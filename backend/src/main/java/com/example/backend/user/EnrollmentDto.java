package com.example.backend.user;

import java.time.LocalDateTime;

public record EnrollmentDto(
        String id,
        String courseId,
        Integer progress,
        LocalDateTime enrolledAt
) {}