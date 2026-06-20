package com.riadh.nextread.controller;

import com.riadh.nextread.dto.StatusUpdateRequest;
import com.riadh.nextread.model.Book;
import com.riadh.nextread.model.Category;
import com.riadh.nextread.model.Status;
import com.riadh.nextread.service.BookService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<Book> findAll(@RequestParam(required = false) Category category,
                               @RequestParam(required = false) Status status) {
        return bookService.findAll(category, status);
    }

    @GetMapping("/{id}")
    public Book findById(@PathVariable Long id) {
        return bookService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Book create(@Valid @RequestBody Book book) {
        return bookService.create(book);
    }

    @PutMapping("/{id}")
    public Book update(@PathVariable Long id, @Valid @RequestBody Book book) {
        return bookService.update(id, book);
    }

    @PatchMapping("/{id}/status")
    public Book updateStatus(@PathVariable Long id, @Valid @RequestBody StatusUpdateRequest request) {
        return bookService.updateStatus(id, request.status());
    }

    @PatchMapping("/{id}/refresh-cover")
    public Book refreshCover(@PathVariable Long id) {
        return bookService.refreshCover(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        bookService.delete(id);
    }
}
