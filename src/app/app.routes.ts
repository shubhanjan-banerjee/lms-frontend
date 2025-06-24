import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DeveloperDashboardComponent } from './components/developer-dashboard/developer-dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './services/role.guard';
import { AccessDeniedComponent } from './components/access-denied.component';
import { DashboardOverviewComponent } from './components/admin-dashboard/dashboard-overview/dashboard-overview.component';
import { EmployeesComponent } from './components/admin-dashboard/employees/employees.component';
import { SkillsRolesComponent } from './components/admin-dashboard/skills-roles/skills-roles.component';
import { LearningPathsComponent } from './components/admin-dashboard/learning-paths/learning-paths.component';
import { ReportsComponent } from './components/admin-dashboard/reports/reports.component';
import { ChatbotComponent } from './components/admin-dashboard/chatbot/chatbot.component';
import { MyCoursesComponent } from './components/developer-dashboard/my-courses/my-courses.component';
import { SkillProgressComponent } from './components/developer-dashboard/skill-progress/skill-progress.component';
import { LearningPathComponent } from './components/developer-dashboard/learning-path/learning-path.component';
import { ReportsComponent as DevReportsComponent } from './components/developer-dashboard/reports/reports.component';
import { ChatbotComponent as DevChatbotComponent } from './components/developer-dashboard/chatbot/chatbot.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['admin'] },
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardOverviewComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'skills', component: SkillsRolesComponent },
      { path: 'learning-paths', component: LearningPathsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'chatbot', component: ChatbotComponent },
    ]
  },
  {
    path: 'developer',
    component: DeveloperDashboardComponent,
    canActivate: [RoleGuard],
    data: { roles: ['developer'] },
    children: [
      { path: '', redirectTo: 'my-courses', pathMatch: 'full' },
      { path: 'my-courses', component: MyCoursesComponent },
      { path: 'skill-progress', component: SkillProgressComponent },
      { path: 'learning-path', component: LearningPathComponent },
      { path: 'reports', component: DevReportsComponent },
      { path: 'chatbot', component: DevChatbotComponent },
    ]
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
