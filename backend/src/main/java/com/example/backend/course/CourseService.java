package com.example.backend.course;

import com.example.backend.model.CourseEntity;
import com.example.backend.model.LessonEntity;
import com.example.backend.model.ModuleEntity;
import com.example.backend.model.UserEntity;
import com.example.backend.model.enums.Role;
import com.example.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

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

    @Transactional(readOnly = true)
    public CourseDetailDto findDetail(String id) {
        CourseEntity course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return CourseDetailDto.fromEntity(course);
    }

    @Transactional
    public CourseDto create(String currentUserId, CourseFormRequest req) {
        requireAdmin(currentUserId);

        CourseEntity course = new CourseEntity();
        course.setId(UUID.randomUUID().toString());
        apply(course, req);
        return CourseDto.fromEntity(courseRepository.save(course));
    }

    @Transactional
    public CourseDto update(String currentUserId, String id, CourseFormRequest req) {
        requireAdmin(currentUserId);

        CourseEntity course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        apply(course, req);
        course.setUpdatedAt(LocalDateTime.now());
        return CourseDto.fromEntity(courseRepository.save(course));
    }

    @Transactional
    public void delete(String currentUserId, String id) {
        requireAdmin(currentUserId);

        CourseEntity course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        courseRepository.delete(course);
    }

    private void apply(CourseEntity course, CourseFormRequest req) {
        course.setTitle(req.title());
        course.setDescription(req.description());
        course.setCategory(req.category());
        course.setLevel(req.level());
        course.setPrice(req.price());
        course.setDuration(req.duration());
        course.setImageUrl(req.imageUrl());
        course.setLearningPoints(req.learningPoints() == null ? new ArrayList<>() : new ArrayList<>(req.learningPoints()));

        if (course.getModuleEntities() == null) course.setModuleEntities(new ArrayList<>());
        course.getModuleEntities().clear();

        List<CourseFormRequest.ModuleForm> modules = req.modules() == null ? List.of() : req.modules();
        for (int i = 0; i < modules.size(); i++) {
            CourseFormRequest.ModuleForm m = modules.get(i);

            ModuleEntity module = new ModuleEntity();
            module.setId(UUID.randomUUID().toString());
            module.setTitle(m.title());
            module.setOrder(i);
            module.setCourseId(course.getId());
            module.setLessonEntities(new ArrayList<>());

            List<CourseFormRequest.LessonForm> lessons = m.lessons() == null ? List.of() : m.lessons();
            for (int j = 0; j < lessons.size(); j++) {
                CourseFormRequest.LessonForm l = lessons.get(j);

                LessonEntity lesson = new LessonEntity();
                lesson.setId(UUID.randomUUID().toString());
                lesson.setTitle(l.title());
                lesson.setDuration(l.duration());
                lesson.setVideoUrl(l.videoUrl());
                lesson.setOrder(j);
                lesson.setModuleId(module.getId());
                module.getLessonEntities().add(lesson);
            }
            course.getModuleEntities().add(module);
        }
    }

    private void requireAdmin(String userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new AccessDeniedException("Unauthorized"));
        if (user.getRole() != Role.ADMIN)
            throw new AccessDeniedException("Unauthorized");
    }
}