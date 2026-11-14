package com.example.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "\"Enrollment\"", uniqueConstraints = {
        @UniqueConstraint(columnNames = {"userId", "courseId"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EnrollmentEntity {

    @Id
    private String id;

    @Column(name = "\"userId\"", nullable = false)
    private String userId;

    @Column(name = "\"courseId\"", nullable = false)
    private String courseId;

    private Integer progress = 0;

    @Column(name = "\"completedLessons\"", columnDefinition = "TEXT[]")
    private java.util.List<String> completedLessons;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "\"userId\"", insertable = false, updatable = false)
    private UserEntity userEntity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "\"courseId\"", insertable = false, updatable = false)
    private CourseEntity course;

    @Column(name = "\"enrolledAt\"")
    private LocalDateTime enrolledAt = LocalDateTime.now();
}