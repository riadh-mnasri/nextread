import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Book, CATEGORY_LABELS, CATEGORY_THEME, Category } from '../models/book.model';
import { RecommendationResponse } from '../models/recommendation.model';
import { BookCoverComponent } from '../books/book-cover.component';
import { StarRatingComponent } from '../shared/star-rating.component';
import { ToastService } from '../shared/toast.service';
import { BookService } from '../services/book.service';
import { RecommendationService } from '../services/recommendation.service';
import { SettingsService } from '../services/settings.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, BookCoverComponent, StarRatingComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  recommendation: RecommendationResponse | null = null;
  focusCategory: Category | null = null;

  toLireCount = 0;
  enCoursCount = 0;
  luCetteAnneeCount = 0;

  readonly categories = Object.keys(CATEGORY_LABELS) as Category[];
  readonly categoryLabels = CATEGORY_LABELS;
  readonly categoryTheme = CATEGORY_THEME;

  constructor(
    private recommendationService: RecommendationService,
    private settingsService: SettingsService,
    private bookService: BookService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.settingsService.get().subscribe((settings) => {
      this.focusCategory = settings.currentFocusCategory;
    });
    this.reload();
  }

  reload(): void {
    this.recommendationService.get().subscribe((recommendation) => {
      this.recommendation = recommendation;
    });

    this.bookService.findAll().subscribe((books) => {
      this.computeCounters(books);
    });
  }

  setFocus(category: Category | null): void {
    this.focusCategory = category;
    this.settingsService.updateFocus(category).subscribe(() => this.reload());
  }

  startReading(book: Book): void {
    if (!book.id) {
      return;
    }
    this.bookService.updateStatus(book.id, 'EN_COURS').subscribe(() => {
      this.toastService.show(`"${book.title}" est maintenant en cours de lecture !`, 'bi-bookmark-star-fill');
      this.reload();
    });
  }

  private computeCounters(books: Book[]): void {
    const currentYear = new Date().getFullYear();
    this.toLireCount = books.filter((b) => b.status === 'A_LIRE').length;
    this.enCoursCount = books.filter((b) => b.status === 'EN_COURS').length;
    this.luCetteAnneeCount = books.filter(
      (b) => b.status === 'LU' && b.dateFinished && new Date(b.dateFinished).getFullYear() === currentYear
    ).length;
  }
}
