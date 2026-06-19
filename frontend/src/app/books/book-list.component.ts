import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book, CATEGORY_LABELS, CATEGORY_THEME, Category, STATUS_LABELS, Status } from '../models/book.model';
import { BookService } from '../services/book.service';
import { ToastService } from '../shared/toast.service';
import { BookCoverComponent } from './book-cover.component';
import { BookFormComponent } from './book-form.component';

const STATUS_ORDER: Status[] = ['A_LIRE', 'EN_COURS', 'LU'];

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, FormsModule, BookFormComponent, BookCoverComponent],
  templateUrl: './book-list.component.html'
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  categoryFilter: Category | null = null;
  statusFilter: Status | null = null;

  showForm = false;
  editingBook: Book | null = null;

  readonly categories = Object.keys(CATEGORY_LABELS) as Category[];
  readonly statuses = STATUS_ORDER;
  readonly categoryLabels = CATEGORY_LABELS;
  readonly statusLabels = STATUS_LABELS;
  readonly categoryTheme = CATEGORY_THEME;

  constructor(private bookService: BookService, private toastService: ToastService) {}

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.bookService.findAll(this.categoryFilter, this.statusFilter).subscribe((books) => {
      this.books = books;
    });
  }

  toggleCategoryFilter(category: Category): void {
    this.categoryFilter = this.categoryFilter === category ? null : category;
    this.reload();
  }

  toggleStatusFilter(status: Status): void {
    this.statusFilter = this.statusFilter === status ? null : status;
    this.reload();
  }

  openAddForm(): void {
    this.editingBook = null;
    this.showForm = true;
  }

  openEditForm(book: Book): void {
    this.editingBook = book;
    this.showForm = true;
  }

  onSaved(book: Book): void {
    const request = this.editingBook?.id
      ? this.bookService.update(this.editingBook.id, book)
      : this.bookService.create(book);
    request.subscribe(() => {
      this.toastService.show(this.editingBook ? 'Livre mis à jour !' : 'Livre ajouté à ta bibliothèque !', 'bi-check-circle-fill');
      this.showForm = false;
      this.reload();
    });
  }

  onCancelled(): void {
    this.showForm = false;
  }

  advanceStatus(book: Book): void {
    const currentIndex = STATUS_ORDER.indexOf(book.status);
    const next = STATUS_ORDER[currentIndex + 1];
    if (!next || !book.id) {
      return;
    }
    this.bookService.updateStatus(book.id, next).subscribe(() => {
      if (next === 'LU') {
        this.toastService.show(`Bravo, "${book.title}" terminé ! 🎉`, 'bi-trophy-fill');
      }
      this.reload();
    });
  }

  remove(book: Book): void {
    if (!book.id || !confirm(`Supprimer "${book.title}" ?`)) {
      return;
    }
    this.bookService.delete(book.id).subscribe(() => this.reload());
  }

  nextStatusLabel(book: Book): string | null {
    const currentIndex = STATUS_ORDER.indexOf(book.status);
    const next = STATUS_ORDER[currentIndex + 1];
    return next ? this.statusLabels[next] : null;
  }
}
