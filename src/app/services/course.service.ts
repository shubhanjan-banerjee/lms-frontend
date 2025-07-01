import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CourseService {
  private apiUrl = environment.apiUrl;
  private baseUrl = this.apiUrl + '/courses';

  constructor(private http: HttpClient) { }

  getCourses(params?: any): Observable<any> {
    return this.http.get(this.baseUrl + '/', { params });
  }

  getCourse(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createCourse(data: any): Observable<any> {
    return this.http.post(this.baseUrl + '/', data);
  }

  updateCourse(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
