package com.example.backend.config;

import com.example.backend.course.CourseController;
import com.example.backend.course.CourseService;
import com.example.backend.model.UserEntity;
import com.example.backend.model.enums.Role;
import com.example.backend.security.JwtService;
import com.example.backend.user.UserRepository;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Optional;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = CourseController.class, properties = "jwt.secret=test-only-key-for-security-config-tests")
@Import({SecurityConfig.class, JwtService.class, CorsConfig.class})
class SecurityConfigTests {

    private static final String USER_ID = "user-1";

    @Autowired
    private MockMvc mvc;

    @Autowired
    private JwtService jwtService;

    @MockitoBean
    private CourseService courseService;

    @MockitoBean
    private UserRepository userRepository;

    @Test
    void publicCatalogIsAvailableWithoutCookie() throws Exception {
        mvc.perform(get("/api/courses")).andExpect(status().isOk());
    }

    @Test
    void salesRequireAuthenticationEvenThoughCourseDetailsArePublic() throws Exception {
        mvc.perform(get("/api/courses/sales")).andExpect(status().isUnauthorized());
        mvc.perform(get("/api/courses/sales").cookie(new Cookie("token", "invalid")))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void deletedUserCannotUseAnExistingToken() throws Exception {
        when(userRepository.findById(USER_ID)).thenReturn(Optional.empty());

        mvc.perform(get("/api/courses/sales").cookie(tokenWithRole(Role.ADMIN)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void salesUseCurrentRoleEvenWhenTokenStillCarriesAnOlderRole() throws Exception {
        UserEntity user = new UserEntity();
        user.setRole(Role.STUDENT);
        when(userRepository.findById(USER_ID)).thenReturn(Optional.of(user));

        mvc.perform(get("/api/courses/sales").cookie(tokenWithRole(Role.ADMIN)))
                .andExpect(status().isForbidden());

        user.setRole(Role.ADMIN);
        mvc.perform(get("/api/courses/sales").cookie(tokenWithRole(Role.STUDENT)))
                .andExpect(status().isOk());
    }

    private Cookie tokenWithRole(Role role) {
        return new Cookie("token", jwtService.generateToken(USER_ID, role.name()));
    }
}
