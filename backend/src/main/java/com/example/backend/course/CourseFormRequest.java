package com.example.backend.course;

import com.example.backend.model.enums.Category;
import com.example.backend.model.enums.Level;

import java.util.List;

public record CourseFormRequest(
        String title,
        String description,
        Category category,
        Level level,
        Integer price,
        String duration,
        String imageUrl,
        List<String> learningPoints,
        List<ModuleForm> modules
) {
    public record ModuleForm(String title, List<LessonForm> lessons) {}
    public record LessonForm(String title, String duration, String videoUrl) {}
}
