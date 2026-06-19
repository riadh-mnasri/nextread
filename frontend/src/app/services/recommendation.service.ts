import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecommendationResponse } from '../models/recommendation.model';

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  private readonly baseUrl = '/api/recommendation';

  constructor(private http: HttpClient) {}

  get(): Observable<RecommendationResponse> {
    return this.http.get<RecommendationResponse>(this.baseUrl);
  }
}
