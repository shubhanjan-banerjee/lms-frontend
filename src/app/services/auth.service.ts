import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  constructor(private router: Router) {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    this._isLoggedIn.next(loggedInStatus);
  }

  login(username: string, password: string): Observable<boolean> {
    return of(true).pipe(
      delay(500),
      tap(success => {
        if (success) {
          this._isLoggedIn.next(true);
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/admin']);
        }
      })
    );
  }

  logout(): void {
    this._isLoggedIn.next(false);
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
