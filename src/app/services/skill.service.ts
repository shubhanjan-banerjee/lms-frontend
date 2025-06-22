import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SkillResponse, SkillCreate } from '../models/skill.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SkillService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSkills(): Observable<SkillResponse[]> {
    return this.http.get<SkillResponse[]>(`${this.apiUrl}/skills`);
  }

  getSkill(id: number): Observable<SkillResponse> {
    return this.http.get<SkillResponse>(`${this.apiUrl}/skills/${id}`);
  }

  createSkill(data: SkillCreate): Observable<SkillResponse> {
    return this.http.post<SkillResponse>(`${this.apiUrl}/skills`, data);
  }

  updateSkill(id: number, data: SkillCreate): Observable<SkillResponse> {
    return this.http.patch<SkillResponse>(`${this.apiUrl}/skills/${id}`, data);
  }

  deleteSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/skills/${id}`);
  }
}
