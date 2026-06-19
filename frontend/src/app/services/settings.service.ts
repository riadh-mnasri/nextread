import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/book.model';
import { Settings } from '../models/settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly baseUrl = '/api/settings';

  constructor(private http: HttpClient) {}

  get(): Observable<Settings> {
    return this.http.get<Settings>(this.baseUrl);
  }

  updateFocus(currentFocusCategory: Category | null): Observable<Settings> {
    return this.http.put<Settings>(this.baseUrl, { currentFocusCategory });
  }
}
