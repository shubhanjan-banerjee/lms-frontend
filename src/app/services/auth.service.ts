import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Token } from '../models/token.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    // Initialize login state based on token presence
    const hasToken = !!this.getToken();
    this.isLoggedInSubject.next(hasToken);
  }

  login(data: { username: string; password: string }): Observable<Token> {
    const body = new URLSearchParams();
    body.set('username', data.username);
    body.set('password', data.password);
    // Add grant_type if required by backend
    body.set('grant_type', 'password');
    return this.http.post<Token>(
      `${this.apiUrl}/token`,
      body.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
  }

  setToken(token: Token) {
    localStorage.setItem('access_token', token.access_token);
    if (token.refresh_token) {
      localStorage.setItem('refresh_token', token.refresh_token);
    }
    this.isLoggedInSubject.next(true);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  clearToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.isLoggedInSubject.next(false);
  }

  refreshToken(): Observable<Token> {
    const refresh_token = this.getRefreshToken();
    if (!refresh_token) throw new Error('No refresh token');
    return this.http.post<Token>(`${this.apiUrl}/refresh`, { refresh_token });
  }

  logout(): void {
    this.clearToken();
    this.router.navigate(['/login']);
    this.isLoggedInSubject.next(false);
  }
}
