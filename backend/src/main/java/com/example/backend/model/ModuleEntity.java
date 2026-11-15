package com.example.backend.model;

import jakarta.persistence.*;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "\"Module\"")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModuleEntity {

    @Id
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(name = "\"order\"")
    private Integer order;

    @Column(name = "\"courseId\"", nullable = false)
    private String courseId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "\"courseId\"", insertable = false, updatable = false)
    private CourseEntity courseEntity;

    @OneToMany(mappedBy = "moduleEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LessonEntity> lessonEntities;
}