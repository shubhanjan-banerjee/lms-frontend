import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProjectRoleResponse, ProjectRoleCreate } from '../models/project-role.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectRoleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProjectRoles(): Observable<ProjectRoleResponse[]> {
    return this.http.get<ProjectRoleResponse[]>(`${this.apiUrl}/project-roles`);
  }

  getProjectRole(id: number): Observable<ProjectRoleResponse> {
    return this.http.get<ProjectRoleResponse>(`${this.apiUrl}/project-roles/${id}`);
  }

  createProjectRole(data: ProjectRoleCreate): Observable<ProjectRoleResponse> {
    return this.http.post<ProjectRoleResponse>(`${this.apiUrl}/project-roles`, data);
  }

  updateProjectRole(id: number, data: ProjectRoleCreate): Observable<ProjectRoleResponse> {
    return this.http.patch<ProjectRoleResponse>(`${this.apiUrl}/project-roles/${id}`, data);
  }

  deleteProjectRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/project-roles/${id}`);
  }
}
