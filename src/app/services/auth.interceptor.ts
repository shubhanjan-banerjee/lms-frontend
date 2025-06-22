import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, from } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(private authService: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.authService.getRefreshToken()) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;
            return this.authService.refreshToken().pipe(
              switchMap((newToken) => {
                this.authService.setToken(newToken);
                this.isRefreshing = false;
                const retryReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken.access_token}`
                  }
                });
                return next.handle(retryReq);
              }),
              catchError(refreshError => {
                this.isRefreshing = false;
                this.authService.clearToken();
                this.router.navigate(['/login']);
                return throwError(() => refreshError);
              })
            );
          }
        } else if (error.status === 401) {
          this.authService.clearToken();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
