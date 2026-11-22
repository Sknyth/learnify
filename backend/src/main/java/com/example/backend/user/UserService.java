package com.example.backend.user;

import com.example.backend.course.CourseRepository;
import com.example.backend.model.UserEntity;
import com.example.backend.model.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

import static com.example.backend.config.CacheConfig.COURSES_SALES;
import static com.example.backend.config.CacheConfig.PUBLISHED_COURSES;
import static com.example.backend.config.CacheConfig.PUBLISHED_COURSE_DETAILS;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;
    private final CacheManager cacheManager;

    public List<UserDto> findAllUsers() {
        return userRepository.findAll().stream()
                .map(UserDto::fromEntity)
                .toList();
    }

    @CacheEvict(cacheNames = PUBLISHED_COURSES, key = "'all'")
    @Transactional
    public UserDto updateUser(String userId, String name, String email, String phone, String jobTitle) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Name is required");
        }
        String normalizedEmail = EmailAddress.normalize(email);
        userRepository.findByEmail(normalizedEmail)
                .filter(existing -> !existing.getId().equals(userId))
                .ifPresent(existing -> { throw new IllegalStateException("This email is already in use"); });

        String normalizedName = name.trim();
        if (!normalizedName.equals(user.getName())) {
            evictPublishedCourseDetails(userId);
        }
        user.setName(normalizedName);
        user.setEmail(normalizedEmail);
        user.setPhone(phone);
        user.setJobTitle(jobTitle);

        return UserDto.fromEntity(userRepository.save(user));
    }

    @Transactional
    public UserDto updateUserRole(String currentUserId, String userId, Role role) {
        if (role == null)
            throw new IllegalArgumentException("Role is required");

        if (Objects.equals(currentUserId, userId))
            throw new AccessDeniedException("Cannot change your own role");

        requireAdmin(currentUserId);

        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        if (role == Role.STUDENT && courseRepository.existsByInstructor_Id(userId)) {
            throw new AccessDeniedException("Cannot assign the student role while the user owns courses");
        }

        user.setRole(role);
        return UserDto.fromEntity(userRepository.save(user));
    }

    @CacheEvict(cacheNames = {PUBLISHED_COURSES, COURSES_SALES}, key = "'all'")
    @Transactional
    public void deleteUser(String currentUserId, String id) {
        if (Objects.equals(currentUserId, id))
            throw new AccessDeniedException("Cannot delete yourself");

        requireAdmin(currentUserId);

        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (user.getRole() == Role.INSTRUCTOR && courseRepository.existsByInstructor_Id(id)) {
            throw new AccessDeniedException("Cannot delete an instructor who owns courses");
        }

        evictPublishedCourseDetails(id);
        userRepository.delete(user);
    }

    private void evictPublishedCourseDetails(String instructorId) {
        var cache = Objects.requireNonNull(cacheManager.getCache(PUBLISHED_COURSE_DETAILS));
        courseRepository.findIdsByInstructorId(instructorId).forEach(cache::evict);
    }

    private void requireAdmin(String userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new AccessDeniedException("Unauthorized"));

        if (user.getRole() != Role.ADMIN)
            throw new AccessDeniedException("Unauthorized");
    }
}
