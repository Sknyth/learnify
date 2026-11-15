package com.example.backend.course.lesson;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/courses/{courseId}/lessons")
@RequiredArgsConstructor
public class LessonController {

    private final LessonService lessonService;

    @GetMapping("/{lessonId}")
    public LessonPageDto getLesson(@PathVariable String courseId,
                                   @PathVariable String lessonId,
                                   Authentication auth) {
        return lessonService.getLessonPage((String) auth.getPrincipal(), courseId, lessonId);
    }
}