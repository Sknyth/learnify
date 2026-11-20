package com.example.backend.user;

import com.example.backend.model.enums.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserDto> getAllUsers() {
        return userService.findAllUsers();
    }

    @PatchMapping("/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody Map<String, String> request, Authentication auth) {
        String userId = (String) auth.getPrincipal();
        String name = request.get("name");
        String email = request.get("email");
        String phone = request.get("phone");
        String jobTitle = request.get("jobTitle");
        return ResponseEntity.status(HttpStatus.CREATED)
                    .body(userService.updateUser(userId, name, email, phone, jobTitle));
    }

    @PatchMapping("/update/role")
    public ResponseEntity<UserDto> updateUserRole(@RequestBody Map<String, String> request, Authentication auth) {
        String currentUserId = (String) auth.getPrincipal();
        String userId = request.get("userId");
        Role role = Role.valueOf(request.get("role"));
        return ResponseEntity.ok(userService.updateUserRole(currentUserId, userId, role));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id, Authentication auth) throws AccessDeniedException {
        userService.deleteUser((String) auth.getPrincipal(), id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> findById(@PathVariable String id) {
        UserDto user = userService.findById(id);
        return ResponseEntity.ok(user);
    }
}
