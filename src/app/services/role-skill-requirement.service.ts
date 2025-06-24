import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleSkillRequirementResponse, RoleSkillRequirementCreate } from '../models/role-skill-requirement.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RoleSkillRequirementService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getRoleSkillRequirements(): Observable<RoleSkillRequirementResponse[]> {
    return this.http.get<RoleSkillRequirementResponse[]>(`${this.apiUrl}/role-skill-requirements`);
  }

  getRoleSkillRequirement(id: number): Observable<RoleSkillRequirementResponse> {
    return this.http.get<RoleSkillRequirementResponse>(`${this.apiUrl}/role-skill-requirements/${id}`);
  }

  createRoleSkillRequirement(data: RoleSkillRequirementCreate): Observable<RoleSkillRequirementResponse> {
    return this.http.post<RoleSkillRequirementResponse>(`${this.apiUrl}/role-skill-requirements`, data);
  }

  updateRoleSkillRequirement(id: number, data: RoleSkillRequirementCreate): Observable<RoleSkillRequirementResponse> {
    return this.http.patch<RoleSkillRequirementResponse>(`${this.apiUrl}/role-skill-requirements/${id}`, data);
  }

  deleteRoleSkillRequirement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/role-skill-requirements/${id}`);
  }
}
