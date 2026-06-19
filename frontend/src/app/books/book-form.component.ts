import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book, CATEGORY_LABELS, CATEGORY_THEME, Category } from '../models/book.model';
import { StarRatingComponent } from '../shared/star-rating.component';

const EMPTY_BOOK: Book = {
  title: '',
  author: '',
  category: 'AUTRE',
  status: 'A_LIRE',
  priority: 3,
  notes: ''
};

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, StarRatingComponent],
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnChanges {
  @Input() book: Book | null = null;
  @Output() saved = new EventEmitter<Book>();
  @Output() cancelled = new EventEmitter<void>();

  draft: Book = { ...EMPTY_BOOK };
  readonly categories = Object.keys(CATEGORY_LABELS) as Category[];
  readonly categoryLabels = CATEGORY_LABELS;
  readonly categoryTheme = CATEGORY_THEME;

  ngOnChanges(): void {
    this.draft = this.book ? { ...this.book } : { ...EMPTY_BOOK };
  }

  selectCategory(category: Category): void {
    this.draft.category = category;
  }

  setPriority(priority: number): void {
    this.draft.priority = priority;
  }

  submit(): void {
    if (!this.draft.title.trim()) {
      return;
    }
    this.saved.emit(this.draft);
  }

  cancel(): void {
    this.cancelled.emit();
  }
}
