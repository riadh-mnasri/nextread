import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { RecommendationResponse } from '../models/recommendation.model';

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  private readonly baseUrl = `${environment.apiUrl}/recommendation`;

  constructor(private http: HttpClient) {}

  get(): Observable<RecommendationResponse> {
    return this.http.get<RecommendationResponse>(this.baseUrl);
  }
}
