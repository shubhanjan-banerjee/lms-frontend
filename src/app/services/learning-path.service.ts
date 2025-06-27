import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class LearningPathService {
  private apiUrl = environment.apiUrl;
  private baseUrl = this.apiUrl + '/learning-paths';

  constructor(private http: HttpClient) { }

  getLearningPaths(params?: any): Observable<any> {
    return this.http.get(this.baseUrl + '/', { params });
  }

  getLearningPath(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createLearningPath(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/', data);
  }

  updateLearningPath(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteLearningPath(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  registerForLearningPath(learningPathId: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/${learningPathId}` + '/register', {});
  }
}
