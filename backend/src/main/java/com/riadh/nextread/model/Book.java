package com.riadh.nextread.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    private String author;

    @Enumerated(EnumType.STRING)
    private Category category = Category.AUTRE;

    @Enumerated(EnumType.STRING)
    private Status status = Status.A_LIRE;

    @Min(1)
    @Max(5)
    private int priority = 3;

    private LocalDate dateAdded = LocalDate.now();

    private LocalDate dateFinished;

    private String notes;

    @Min(1)
    @Max(5)
    private Integer rating;

    private String coverUrl;
}
