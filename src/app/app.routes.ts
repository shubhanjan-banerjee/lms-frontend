import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DeveloperDashboardComponent } from './components/developer-dashboard/developer-dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './services/role.guard';
import { AccessDeniedComponent } from './components/access-denied.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [RoleGuard], data: { roles: ['admin'] } },
  { path: 'developer', component: DeveloperDashboardComponent, canActivate: [RoleGuard], data: { roles: ['developer'] } },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
