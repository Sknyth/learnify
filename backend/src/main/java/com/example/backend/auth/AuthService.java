package com.example.backend.auth;

import com.example.backend.model.UserEntity;
import com.example.backend.security.JwtService;
import com.example.backend.user.UserDto;
import com.example.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

    public record AuthResponse(String token, UserDto user) {}

    public UserDto me(String userId) {
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        return UserDto.fromEntity(user);
    }

    public AuthResponse createUser(String email, String password, String name) {
        if (name == null || name.isBlank() || email == null || email.isBlank() || password == null || password.isBlank()) {
            throw new IllegalArgumentException("Fields cannot be empty");
        }

        email = email.trim().toLowerCase(java.util.Locale.ROOT);
        name = name.trim();

        if (userRepository.existsByEmail(email)) {
            throw new RuntimeException("User with this email already exists");
        }

        UserEntity user = new UserEntity();
        user.setId(java.util.UUID.randomUUID().toString());
        user.setEmail(email);
        user.setPassword(bcrypt.encode(password));
        user.setName(name);
        user.setRole(com.example.backend.model.enums.Role.STUDENT);
        user.setCreatedAt(java.time.LocalDateTime.now());

        UserDto created = UserDto.fromEntity(userRepository.save(user));
        String token = jwtService.generateToken(created.id(), created.role().name());

        return new AuthResponse(token, created);
    }

    public AuthResponse signIn(String email, String password) {
        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            throw new IllegalArgumentException("Email and password are required");
        }

        email = email.trim().toLowerCase(java.util.Locale.ROOT);

        UserEntity user = userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!bcrypt.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getId(), user.getRole().name());

        return new AuthResponse(token, UserDto.fromEntity(user));
    }
}
