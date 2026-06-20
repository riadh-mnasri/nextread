package com.riadh.nextread.service;

import com.riadh.nextread.model.Book;
import com.riadh.nextread.model.Category;
import com.riadh.nextread.model.Status;
import com.riadh.nextread.repository.BookRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final CoverService coverService;

    public BookService(BookRepository bookRepository, CoverService coverService) {
        this.bookRepository = bookRepository;
        this.coverService = coverService;
    }

    public List<Book> findAll(Category category, Status status) {
        if (category != null && status != null) {
            return bookRepository.findByStatusAndCategory(status, category);
        }
        if (category != null) {
            return bookRepository.findByCategory(category);
        }
        if (status != null) {
            return bookRepository.findByStatus(status);
        }
        return bookRepository.findAll();
    }

    public Book findById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Livre introuvable: " + id));
    }

    public Book create(Book book) {
        book.setId(null);
        if (book.getCoverUrl() == null || book.getCoverUrl().isBlank()) {
            coverService.findCoverUrl(book.getTitle(), book.getAuthor()).ifPresent(book::setCoverUrl);
        }
        return bookRepository.save(book);
    }

    public Book update(Long id, Book update) {
        Book existing = findById(id);
        existing.setTitle(update.getTitle());
        existing.setAuthor(update.getAuthor());
        existing.setCategory(update.getCategory());
        existing.setPriority(update.getPriority());
        existing.setNotes(update.getNotes());
        existing.setRating(update.getRating());
        existing.setCoverUrl(update.getCoverUrl());
        return bookRepository.save(existing);
    }

    public Book refreshCover(Long id) {
        Book book = findById(id);
        coverService.findCoverUrl(book.getTitle(), book.getAuthor()).ifPresent(book::setCoverUrl);
        return bookRepository.save(book);
    }

    public Book updateStatus(Long id, Status status) {
        Book book = findById(id);
        book.setStatus(status);
        book.setDateFinished(status == Status.LU ? LocalDate.now() : null);
        return bookRepository.save(book);
    }

    public void delete(Long id) {
        Book book = findById(id);
        bookRepository.delete(book);
    }
}
