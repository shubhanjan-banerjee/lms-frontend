import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse, UserCreate, UserUpdate } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(`${this.apiUrl}/users`);
  }

  getUser(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/users/${id}`);
  }

  createUser(data: UserCreate): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.apiUrl}/users`, data);
  }

  updateUser(id: number, data: UserUpdate): Observable<UserResponse> {
    return this.http.patch<UserResponse>(`${this.apiUrl}/users/${id}`, data);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`);
  }
}
