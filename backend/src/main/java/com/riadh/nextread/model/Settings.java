package com.riadh.nextread.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Table à une seule ligne (id fixé à 1) pour stocker le focus de lecture actuel.
 */
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Settings {

    @Id
    private Long id = 1L;

    @Enumerated(EnumType.STRING)
    private Category currentFocusCategory;
}
