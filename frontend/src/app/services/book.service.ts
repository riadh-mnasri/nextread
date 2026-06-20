import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Book, Category, Status } from '../models/book.model';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly baseUrl = `${environment.apiUrl}/books`;

  constructor(private http: HttpClient) {}

  findAll(category?: Category | null, status?: Status | null): Observable<Book[]> {
    const params: Record<string, string> = {};
    if (category) params['category'] = category;
    if (status) params['status'] = status;
    return this.http.get<Book[]>(this.baseUrl, { params });
  }

  create(book: Book): Observable<Book> {
    return this.http.post<Book>(this.baseUrl, book);
  }

  update(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/${id}`, book);
  }

  updateStatus(id: number, status: Status): Observable<Book> {
    return this.http.patch<Book>(`${this.baseUrl}/${id}/status`, { status });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  refreshCover(id: number): Observable<Book> {
    return this.http.patch<Book>(`${this.baseUrl}/${id}/refresh-cover`, {});
  }
}
