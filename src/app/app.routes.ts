import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { RoleGuard } from './services/role.guard';
import { AdminDashboardComponent } from './components/admin/admin-dashboard.component';
import { AdminDashboardOverviewComponent } from './components/admin/admin-dashboard-overview/admin-dashboard-overview.component';
import { EmployeesComponent } from './components/admin/employees/employees.component';
import { SkillsRolesComponent } from './components/admin/skills-roles/skills-roles.component';
import { AdminLearningPathsListComponent } from './components/admin/learning-paths-list/learning-paths-list.component';
import { AdminLearningPathDetailsComponent } from './components/admin/learning-path-details/learning-path-details.component';
import { AdminCoursesListComponent } from './components/admin/courses-list/courses-list.component';
import { AdminCourseDetailsComponent } from './components/admin/course-details/course-details.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { ChatbotComponent } from './components/shared/chatbot/chatbot.component';
import { DeveloperDashboardComponent } from './components/developer/developer-dashboard.component';
import { DeveloperDashboardOverviewComponent } from './components/developer/developer-dashboard-overview/developer-dashboard-overview.component';
import { MyCoursesComponent } from './components/developer/my-courses/my-courses.component';
import { SkillProgressComponent } from './components/developer/skill-progress/skill-progress.component';
import { DeveloperLearningPathsListComponent } from './components/developer/learning-paths-list/learning-paths-list.component';
import { DeveloperLearningPathDetailsComponent } from './components/developer/learning-path-details/learning-path-details.component';
import { DeveloperCoursesListComponent } from './components/developer/courses-list/courses-list.component';
import { DeveloperCourseDetailsComponent } from './components/developer/course-details/course-details.component';
import { AccessDeniedComponent } from './components/shared/access-denied.component';

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
      { path: 'dashboard', component: AdminDashboardOverviewComponent },
      { path: 'employees', component: EmployeesComponent },
      { path: 'skills', component: SkillsRolesComponent },
      { path: 'learning-paths', component: AdminLearningPathsListComponent },
      { path: 'learning-paths/:id', component: AdminLearningPathDetailsComponent },
      { path: 'courses', component: AdminCoursesListComponent },
      { path: 'courses/:id', component: AdminCourseDetailsComponent },
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
      { path: 'dashboard', component: DeveloperDashboardOverviewComponent },
      { path: 'my-courses', component: MyCoursesComponent },
      { path: 'skill-progress', component: SkillProgressComponent },
      { path: 'learning-paths', component: DeveloperLearningPathsListComponent },
      { path: 'learning-paths/:id', component: DeveloperLearningPathDetailsComponent },
      { path: 'courses', component: DeveloperCoursesListComponent },
      { path: 'courses/:id', component: DeveloperCourseDetailsComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'chatbot', component: ChatbotComponent },
    ]
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
