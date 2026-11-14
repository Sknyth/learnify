package com.example.backend.auth;

import com.example.backend.user.UserDto;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signUp")
    public ResponseEntity<UserDto> createUser(
            @RequestBody Map<String, String> request,
            HttpServletResponse response
    ) {
        String email = request.get("email");
        String password = request.get("password");
        String name = request.get("name");

        var authResult = authService.createUser(email, password, name);

        ResponseCookie jwtCookie = ResponseCookie.from("token", authResult.token())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Strict")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());

        return ResponseEntity.status(HttpStatus.CREATED).body(authResult.user());
    }

    @PostMapping("/signIn")
    public ResponseEntity<UserDto> signIn(
            @RequestBody Map<String, String> request,
            HttpServletResponse response
    ) {
        String email = request.get("email");
        String password = request.get("password");

        var authResult = authService.signIn(email, password);

        ResponseCookie jwtCookie = ResponseCookie.from("token", authResult.token())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(7 * 24 * 60 * 60)
                .sameSite("Strict")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());

        return ResponseEntity.ok(authResult.user());
    }
}