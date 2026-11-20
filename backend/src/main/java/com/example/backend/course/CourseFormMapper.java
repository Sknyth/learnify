package com.example.backend.course;

import com.example.backend.model.CourseEntity;
import com.example.backend.model.LessonEntity;
import com.example.backend.model.ModuleEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

final class CourseFormMapper {
    private CourseFormMapper() {}

    static void apply(CourseEntity course, CourseFormRequest req) {
        course.setTitle(req.title());
        course.setDescription(req.description());
        course.setCategory(req.category());
        course.setLevel(req.level());
        course.setPrice(req.price());
        course.setDuration(req.duration());
        course.setImageUrl(req.imageUrl());
        course.setLearningPoints(req.learningPoints() == null ? new ArrayList<>() : new ArrayList<>(req.learningPoints()));

        if (course.getModuleEntities() == null) course.setModuleEntities(new ArrayList<>());
        course.getModuleEntities().clear();

        List<CourseFormRequest.ModuleForm> modules = req.modules() == null ? List.of() : req.modules();
        for (int i = 0; i < modules.size(); i++) {
            CourseFormRequest.ModuleForm m = modules.get(i);

            ModuleEntity module = new ModuleEntity();
            module.setId(UUID.randomUUID().toString());
            module.setTitle(m.title());
            module.setOrder(i);
            module.setCourseId(course.getId());
            module.setLessonEntities(new ArrayList<>());

            List<CourseFormRequest.LessonForm> lessons = m.lessons() == null ? List.of() : m.lessons();
            for (int j = 0; j < lessons.size(); j++) {
                CourseFormRequest.LessonForm l = lessons.get(j);

                LessonEntity lesson = new LessonEntity();
                lesson.setId(UUID.randomUUID().toString());
                lesson.setTitle(l.title());
                lesson.setDuration(l.duration());
                lesson.setVideoUrl(l.videoUrl());
                lesson.setOrder(j);
                lesson.setModuleId(module.getId());
                module.getLessonEntities().add(lesson);
            }
            course.getModuleEntities().add(module);
        }
    }
}
