package com.example.backend.course;

import com.example.backend.model.CourseEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    @Transactional(readOnly = true)
    public List<CourseSalesDto> findSales() {
        Map<String, Long> counts = courseRepository.countEnrollmentsPerCourse().stream()
                .collect(Collectors.toMap(r -> (String) r[0], r -> (Long) r[1]));

        return courseRepository.findAll().stream()
                .map(c -> new CourseSalesDto(c.getId(), c.getTitle(), c.getPrice(),
                        counts.getOrDefault(c.getId(), 0L)))
                .toList();
    }
}