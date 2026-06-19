package com.riadh.nextread.dto;

import com.riadh.nextread.model.Book;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class RecommendationResponse {
    private final Book next;
    private final List<Book> upcoming;
}
