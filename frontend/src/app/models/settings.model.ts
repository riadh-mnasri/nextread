import { Category } from './book.model';

export interface Settings {
  id?: number;
  currentFocusCategory: Category | null;
}
