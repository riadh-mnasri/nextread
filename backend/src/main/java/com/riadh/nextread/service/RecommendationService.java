package com.riadh.nextread.service;

import com.riadh.nextread.dto.RecommendationResponse;
import com.riadh.nextread.model.Book;
import com.riadh.nextread.model.Category;
import com.riadh.nextread.model.Settings;
import com.riadh.nextread.model.Status;
import com.riadh.nextread.repository.BookRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class RecommendationService {

    private final BookRepository bookRepository;
    private final SettingsService settingsService;

    public RecommendationService(BookRepository bookRepository, SettingsService settingsService) {
        this.bookRepository = bookRepository;
        this.settingsService = settingsService;
    }

    public RecommendationResponse recommend() {
        Settings settings = settingsService.get();
        Category focus = settings.getCurrentFocusCategory();

        List<Book> ranked = bookRepository.findByStatus(Status.A_LIRE).stream()
                .sorted(Comparator
                        .comparing((Book b) -> focus != null && focus.equals(b.getCategory()) ? 0 : 1)
                        .thenComparing(Book::getPriority, Comparator.reverseOrder())
                        .thenComparing(Book::getDateAdded))
                .toList();

        Book next = ranked.isEmpty() ? null : ranked.get(0);
        List<Book> upcoming = ranked.size() > 1 ? ranked.subList(1, Math.min(4, ranked.size())) : List.of();

        return new RecommendationResponse(next, upcoming);
    }
}
