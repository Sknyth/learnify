package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "\"Lesson\"")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Lesson {

    @Id
    private String id;

    @Column(nullable = false)
    private String title;

    private String duration;

    @Column(name = "\"order\"")
    private Integer order;

    @Column(name = "\"videoUrl\"")
    private String videoUrl;

    @Column(name = "\"moduleId\"", nullable = false)
    private String moduleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "\"moduleId\"", insertable = false, updatable = false)
    private Module module;
}