package com.example.backend;

import com.example.backend.auth.AuthService;
import com.example.backend.course.CourseFormRequest;
import com.example.backend.course.CourseService;
import com.example.backend.model.enums.Category;
import com.example.backend.model.enums.Level;
import com.example.backend.model.enums.StatusCourse;
import jakarta.persistence.EntityManager;
import jakarta.servlet.http.Cookie;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = "jwt.secret=test-only-key-for-backend-application-tests")
@AutoConfigureMockMvc
@Transactional
class BackendApplicationTests {
    @Autowired
    private AuthService authService;

    @Autowired
    private CourseService courseService;

    @Autowired
    private JdbcTemplate jdbc;

    @Autowired
    private MockMvc mvc;

    @Autowired
    private EntityManager entityManager;

    @Test
    void onlyAuthorizedLessonResponsesIncludeVideoLinks() throws Exception {
        var admin = authService.createUser("admin@example.test", "test-password", "Admin");
        entityManager.flush();
        jdbc.update("UPDATE \"User\" SET role = 'ADMIN' WHERE id = ?", admin.user().id());
        entityManager.clear();
        var adminCookie = cookie(authService.signIn("admin@example.test", "test-password"));
        var student = authService.createUser("student@example.test", "test-password", "Student");
        var studentCookie = cookie(student);
        var videoUrl = "https://example.test/lesson";
        var lesson = new CourseFormRequest.LessonForm("Lesson", "10m", videoUrl);
        var module = new CourseFormRequest.ModuleForm("Module", List.of(lesson));
        var course = courseService.create(admin.user().id(), new CourseFormRequest(
                "Course", "Description", Category.WebDev, Level.Beginner, 10, "10m",
                "https://example.test/cover", List.of(), List.of(module)));

        enroll(course.id(), studentCookie).andExpect(status().isBadRequest());

        courseService.updateStatus(admin.user().id(), course.id(), StatusCourse.Published);
        entityManager.flush();
        entityManager.clear();
        mvc.perform(get("/api/courses/{id}", course.id()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.modules[0].lessons[0].title").value("Lesson"))
                .andExpect(jsonPath("$.modules[0].lessons[0].videoUrl").doesNotHaveJsonPath());

        mvc.perform(get("/api/courses/{id}/edit", course.id()).cookie(adminCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.modules[0].lessons[0].videoUrl").value(videoUrl));
        mvc.perform(get("/api/courses/{id}/edit", course.id()).cookie(studentCookie))
                .andExpect(status().isForbidden());

        var lessonId = courseService.findPublishedDetail(course.id()).modules().getFirst().lessons().getFirst().id();
        mvc.perform(get("/api/courses/{id}/lessons/{lessonId}", course.id(), lessonId).cookie(studentCookie))
                .andExpect(status().isForbidden());
        enroll(course.id(), studentCookie).andExpect(status().isCreated());
        mvc.perform(get("/api/courses/{id}/lessons/{lessonId}", course.id(), lessonId).cookie(studentCookie))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.lesson.videoUrl").value(videoUrl));
    }

    @Test
    void profileUpdatesKeepEmailsUniqueRegardlessOfCase() throws Exception {
        var existing = authService.createUser("owner@example.test", "test-password", "Owner");
        var other = authService.createUser("other@example.test", "test-password", "Other");

        mvc.perform(get("/api/users/{id}", existing.user().id()).cookie(cookie(other)))
                .andExpect(status().isNotFound());
        updateEmail("OWNER@example.test", cookie(other)).andExpect(status().isConflict());
        updateEmail(" NEW@example.test ", cookie(other))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("new@example.test"));
        mvc.perform(post("/api/auth/signIn")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"email":"NEW@example.test","password":"test-password"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(other.user().id()));
    }

    private ResultActions enroll(String courseId, Cookie token) throws Exception {
        return mvc.perform(post("/api/enrollments/enroll").cookie(token)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"courseId\":\"" + courseId + "\"}"));
    }

    private ResultActions updateEmail(String email, Cookie token) throws Exception {
        return mvc.perform(patch("/api/users/update").cookie(token)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"name\":\"Other\",\"email\":\"" + email + "\"}"));
    }

    private static Cookie cookie(AuthService.AuthResponse response) {
        return new Cookie("token", response.token());
    }
}
