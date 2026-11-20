package com.example.backend.user;

import java.time.LocalDateTime;

public record UserEnrollmentSummaryDto(
        String id,
        String courseId,
        Integer progress,
        LocalDateTime enrolledAt
) {}