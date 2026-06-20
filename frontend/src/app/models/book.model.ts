export type Category = 'INFORMATIQUE' | 'ECHECS' | 'DEVELOPPEMENT_PERSONNEL' | 'AUTRE';

export type Status = 'A_LIRE' | 'EN_COURS' | 'LU';

export interface Book {
  id?: number;
  title: string;
  author?: string;
  category: Category;
  status: Status;
  priority: number;
  dateAdded?: string;
  dateFinished?: string | null;
  notes?: string;
  rating?: number | null;
  coverUrl?: string | null;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  INFORMATIQUE: 'Informatique',
  ECHECS: 'Échecs',
  DEVELOPPEMENT_PERSONNEL: 'Développement personnel',
  AUTRE: 'Autre'
};

export const STATUS_LABELS: Record<Status, string> = {
  A_LIRE: 'À lire',
  EN_COURS: 'En cours',
  LU: 'Lu'
};

export interface CategoryTheme {
  icon: string;
  chipClass: string;
  coverClass: string;
}

export const CATEGORY_THEME: Record<Category, CategoryTheme> = {
  INFORMATIQUE: { icon: 'bi-cpu', chipClass: 'cat-info', coverClass: 'cover-info' },
  ECHECS: { icon: 'bi-grid-3x3-gap-fill', chipClass: 'cat-echecs', coverClass: 'cover-echecs' },
  DEVELOPPEMENT_PERSONNEL: { icon: 'bi-sun-fill', chipClass: 'cat-devperso', coverClass: 'cover-devperso' },
  AUTRE: { icon: 'bi-stars', chipClass: 'cat-autre', coverClass: 'cover-autre' }
};
