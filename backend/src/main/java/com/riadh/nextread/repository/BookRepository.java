package com.riadh.nextread.repository;

import com.riadh.nextread.model.Book;
import com.riadh.nextread.model.Category;
import com.riadh.nextread.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findByStatus(Status status);

    List<Book> findByCategory(Category category);

    List<Book> findByStatusAndCategory(Status status, Category category);
}
