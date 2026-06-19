import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './star-rating.component.html'
})
export class StarRatingComponent {
  @Input() value = 0;
  @Input() max = 5;
  @Input() editable = false;
  @Input() size = '1rem';
  @Output() valueChange = new EventEmitter<number>();

  get stars(): number[] {
    return Array.from({ length: this.max }, (_, i) => i + 1);
  }

  select(star: number): void {
    if (!this.editable) {
      return;
    }
    this.valueChange.emit(star);
  }
}
