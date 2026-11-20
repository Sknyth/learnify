package com.example.backend.course;

import com.example.backend.model.CourseEntity;
import com.example.backend.model.UserEntity;
import com.example.backend.model.enums.Role;
import com.example.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<CourseDto> findAllCourses() {
        List<CourseEntity> allCourses = courseRepository.findAll();

        return allCourses.stream()
                .map(CourseDto::fromEntity)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<CourseDto> findMyCourses(String currentUserId) {
        UserEntity currentUser = findUser(currentUserId);
        if (currentUser.getRole() != Role.INSTRUCTOR && currentUser.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Unauthorized");
        }
        return courseRepository.findAllByInstructor_Id(currentUserId).stream()
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found"));
        return CourseDetailDto.fromEntity(course);
    }

    @Transactional
    public CourseDto create(String currentUserId, CourseFormRequest req) {
        UserEntity owner = requireCourseCreator(currentUserId);

        CourseEntity course = new CourseEntity();
        course.setId(UUID.randomUUID().toString());
        course.setInstructor(owner);
        CourseFormMapper.apply(course, req);
        return CourseDto.fromEntity(courseRepository.save(course));
    }

    @Transactional
    public CourseDto update(String currentUserId, String id, CourseFormRequest req) {
        UserEntity actor = findUser(currentUserId);

        CourseEntity course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        if (actor.getRole() != Role.ADMIN && (actor.getRole() != Role.INSTRUCTOR
                || course.getInstructor() == null
                || !currentUserId.equals(course.getInstructor().getId()))) {
            throw new AccessDeniedException("Unauthorized");
        }
        CourseFormMapper.apply(course, req);
        course.setUpdatedAt(LocalDateTime.now());
        return CourseDto.fromEntity(courseRepository.save(course));
    }

    @Transactional
    public void delete(String currentUserId, String id) {
        UserEntity actor = findUser(currentUserId);

        CourseEntity course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        if (actor.getRole() != Role.ADMIN && (actor.getRole() != Role.INSTRUCTOR
                || course.getInstructor() == null
                || !currentUserId.equals(course.getInstructor().getId()))) {
            throw new AccessDeniedException("Unauthorized");
        }
        courseRepository.delete(course);
    }

    private UserEntity requireCourseCreator(String userId) {
        UserEntity user = findUser(userId);
        if (user.getRole() != Role.INSTRUCTOR && user.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("Unauthorized");
        }
        return user;
    }

    private UserEntity findUser(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new AccessDeniedException("Unauthorized"));
    }
}
