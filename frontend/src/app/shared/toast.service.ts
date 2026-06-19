import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  icon: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private nextId = 0;
  readonly toasts = signal<Toast[]>([]);

  show(message: string, icon = 'bi-check-circle-fill'): void {
    const id = this.nextId++;
    this.toasts.update((toasts) => [...toasts, { id, message, icon }]);
    setTimeout(() => this.dismiss(id), 2600);
  }

  dismiss(id: number): void {
    this.toasts.update((toasts) => toasts.filter((t) => t.id !== id));
  }
}
