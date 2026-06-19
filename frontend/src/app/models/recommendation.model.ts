import { Book } from './book.model';

export interface RecommendationResponse {
  next: Book | null;
  upcoming: Book[];
}
