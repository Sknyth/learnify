package com.example.backend.user;

import com.example.backend.model.enums.Role;
import com.example.backend.model.UserEntity;

import java.time.LocalDateTime;
import java.util.List;

public record UserDto(
        String id,
        String email,
        String name,
        String phone,
        String jobTitle,
        Role role,
        LocalDateTime createdAt,
        List<EnrollmentDto> enrollments
) {
    public static UserDto fromEntity(UserEntity user) {
        List<EnrollmentDto> enrollmentDtos = user.getEnrollmentEntities() != null
                ? user.getEnrollmentEntities().stream()
                .map(e -> new EnrollmentDto(
                        e.getId(),
                        e.getCourseId(),
                        e.getProgress(),
                        e.getEnrolledAt()
                ))
                .toList()
                : List.of();

        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getName(),
                user.getPhone(),
                user.getJobTitle(),
                user.getRole(),
                user.getCreatedAt(),
                enrollmentDtos
        );
    }
}