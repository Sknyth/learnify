package com.example.backend.model;

import com.example.backend.model.enums.Category;
import com.example.backend.model.enums.Level;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "\"Course\"")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CourseEntity {

    @Id
    private String id;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(nullable = false)
    private Category category;

    @Enumerated(EnumType.STRING)
    @JdbcTypeCode(SqlTypes.NAMED_ENUM)
    @Column(nullable = false)
    private Level level;

    private Integer price;
    private String duration;

    @Column(name = "\"imageUrl\"")
    private String imageUrl;

    private Double rating = 0.0;

    @Column(name = "\"reviewsCount\"")
    private Integer reviewsCount = 0;

    @Column(name = "\"studentsCount\"")
    private Integer studentsCount = 0;

    @Column(name = "\"learningPoints\"", columnDefinition = "TEXT[]")
    private List<String> learningPoints;

    @OneToMany(mappedBy = "courseEntity", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ModuleEntity> moduleEntities;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EnrollmentEntity> enrollmentEntities;

    @Column(name = "\"createdAt\"")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "\"updatedAt\"")
    private LocalDateTime updatedAt = LocalDateTime.now();
}