import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserSkillResponse, UserSkillCreate } from '../models/user-skill.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserSkillService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUserSkills(): Observable<UserSkillResponse[]> {
    return this.http.get<UserSkillResponse[]>(`${this.apiUrl}/user-skills`);
  }

  getUserSkill(id: number): Observable<UserSkillResponse> {
    return this.http.get<UserSkillResponse>(`${this.apiUrl}/user-skills/${id}`);
  }

  createUserSkill(data: UserSkillCreate): Observable<UserSkillResponse> {
    return this.http.post<UserSkillResponse>(`${this.apiUrl}/user-skills`, data);
  }

  updateUserSkill(id: number, data: UserSkillCreate): Observable<UserSkillResponse> {
    return this.http.patch<UserSkillResponse>(`${this.apiUrl}/user-skills/${id}`, data);
  }

  deleteUserSkill(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/user-skills/${id}`);
  }
}
