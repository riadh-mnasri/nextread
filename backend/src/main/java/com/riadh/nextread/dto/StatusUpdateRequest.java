package com.riadh.nextread.dto;

import com.riadh.nextread.model.Status;
import jakarta.validation.constraints.NotNull;

public record StatusUpdateRequest(@NotNull Status status) {
}
