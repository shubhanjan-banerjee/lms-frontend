import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProficiencyLevelResponse, ProficiencyLevelCreate } from '../models/proficiency-level.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProficiencyLevelService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProficiencyLevels(): Observable<ProficiencyLevelResponse[]> {
    return this.http.get<ProficiencyLevelResponse[]>(`${this.apiUrl}/proficiency-levels`);
  }

  getProficiencyLevel(id: number): Observable<ProficiencyLevelResponse> {
    return this.http.get<ProficiencyLevelResponse>(`${this.apiUrl}/proficiency-levels/${id}`);
  }

  createProficiencyLevel(data: ProficiencyLevelCreate): Observable<ProficiencyLevelResponse> {
    return this.http.post<ProficiencyLevelResponse>(`${this.apiUrl}/proficiency-levels`, data);
  }

  updateProficiencyLevel(id: number, data: ProficiencyLevelCreate): Observable<ProficiencyLevelResponse> {
    return this.http.patch<ProficiencyLevelResponse>(`${this.apiUrl}/proficiency-levels/${id}`, data);
  }

  deleteProficiencyLevel(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/proficiency-levels/${id}`);
  }
}
