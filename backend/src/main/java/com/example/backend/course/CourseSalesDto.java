package com.example.backend.course;

import com.example.backend.model.enums.StatusCourse;

public record CourseSalesDto(String id, String title, Integer price, long enrollmentsCount, StatusCourse status) {}
