import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

function decodeJwt(token: string): any {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

@Injectable({ providedIn: 'root' })
export class RoleGuard {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate: CanActivateFn = (route, state) => {
    const expectedRoles = route.data?.['roles'] as string[];
    const token = this.authService.getToken();
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    const decoded = decodeJwt(token);
    if (!decoded || !decoded.role || !expectedRoles.includes(decoded.role.toLowerCase())) {
      this.router.navigate(['/access-denied']);
      return false;
    }
    return true;
  };
}
