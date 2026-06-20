import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book, CATEGORY_LABELS, CATEGORY_THEME, STATUS_LABELS } from '../models/book.model';
import { StarRatingComponent } from '../shared/star-rating.component';

@Component({
  selector: 'app-book-cover',
  standalone: true,
  imports: [CommonModule, StarRatingComponent],
  templateUrl: './book-cover.component.html'
})
export class BookCoverComponent {
  @Input({ required: true }) book!: Book;
  @Input() compact = false;
  @Input() showActions = false;
  @Input() nextStatusLabel: string | null = null;
  @Output() advance = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() remove = new EventEmitter<void>();
  @Output() refreshCover = new EventEmitter<void>();

  readonly categoryLabels = CATEGORY_LABELS;
  readonly statusLabels = STATUS_LABELS;
  readonly categoryTheme = CATEGORY_THEME;
}
