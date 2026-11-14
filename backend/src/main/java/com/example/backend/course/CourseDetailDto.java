package com.example.backend.course;

import com.example.backend.model.CourseEntity;

import java.util.Comparator;
import java.util.List;

public record CourseDetailDto(String id, String title, String imageUrl, List<ModuleDto> modules) {
    public static CourseDetailDto fromEntity(CourseEntity c) {
        return new CourseDetailDto(
                c.getId(),
                c.getTitle(),
                c.getImageUrl(),
                c.getModules().stream()
                        .sorted(Comparator.comparing(com.example.backend.model.Module::getOrder))
                        .map(ModuleDto::fromEntity)
                        .toList());
    }
}