package com.example.backend.course;

import com.example.backend.model.CourseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;

    public List<CourseDto> findAllCourses() {
        List<CourseEntity> allCourses = courseRepository.findAll();

        return allCourses.stream()
                .map(CourseDto::fromEntity)
                .toList();
    }

}