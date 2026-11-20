package com.example.backend.user;

import com.example.backend.model.UserEntity;
import com.example.backend.model.enums.Role;
import com.example.backend.course.CourseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public List<UserDto> findAllUsers() {
        return userRepository.findAll().stream()
                .map(UserDto::fromEntity)
                .toList();
    }

    public UserDto findById(String id) {
        UserEntity user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        return UserDto.fromEntity(user);
    }

    @Transactional
    public UserDto updateUser(String userId, String name, String email, String phone, String jobTitle) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        user.setName(name);
        user.setEmail(email);
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

        if (user.getRole() == Role.INSTRUCTOR && role != Role.INSTRUCTOR
                && courseRepository.existsByInstructor_Id(userId)) {
            throw new AccessDeniedException("Cannot remove instructor role while the user owns courses");
        }

        user.setRole(role);
        return UserDto.fromEntity(userRepository.save(user));
    }

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

        userRepository.delete(user);
    }

    private void requireAdmin(String userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new AccessDeniedException("Unauthorized"));

        if (user.getRole() != Role.ADMIN)
            throw new AccessDeniedException("Unauthorized");
    }
}
