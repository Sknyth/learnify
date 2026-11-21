package com.example.backend.course;

import com.example.backend.model.enums.StatusCourse;

public record AdminCourseSummaryDto(
        String id,
        String title,
        String instructor,
        Long studentsCount,
        StatusCourse status
) {
}
