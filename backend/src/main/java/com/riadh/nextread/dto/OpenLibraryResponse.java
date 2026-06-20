package com.riadh.nextread.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record OpenLibraryResponse(List<Doc> docs) {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Doc(@JsonProperty("cover_i") Integer coverId) {
    }
}
