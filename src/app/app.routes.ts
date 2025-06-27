import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { DeveloperDashboardComponent } from './components/developer-dashboard/developer-dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { RoleGuard } from './services/role.guard';
import { AccessDeniedComponent } from './components/access-denied.component';
import { EmployeesComponent } from './components/admin-dashboard/employees/employees.component';
import { SkillsRolesComponent } from './components/admin-dashboard/skills-roles/skills-roles.component';
import { ReportsComponent } from './components/admin-dashboard/reports/reports.component';
import { ChatbotComponent } from './components/admin-dashboard/chatbot/chatbot.component';
import { MyCoursesComponent } from './components/developer-dashboard/my-courses/my-courses.component';
import { SkillProgressComponent } from './components/developer-dashboard/skill-progress/skill-progress.component';
import { ReportsComponent as DevReportsComponent } from './components/developer-dashboard/reports/reports.component';
import { ChatbotComponent as DevChatbotComponent } from './components/developer-dashboard/chatbot/chatbot.component';
import { AdminLearningPathsListComponent } from './components/admin-dashboard/learning-paths-list/learning-paths-list.component';
import { AdminLearningPathDetailsComponent } from './components/admin-dashboard/learning-path-details/learning-path-details.component';
import { AdminCoursesListComponent } from './components/admin-dashboard/courses-list/courses-list.component';
import { AdminCourseDetailsComponent } from './components/admin-dashboard/course-details/course-details.component';
import { DeveloperLearningPathsListComponent } from './components/developer-dashboard/learning-paths-list/learning-paths-list.component';
import { DeveloperLearningPathDetailsComponent } from './components/developer-dashboard/learning-path-details/learning-path-details.component';
import { DeveloperCoursesListComponent } from './components/developer-dashboard/courses-list/courses-list.component';
import { DeveloperCourseDetailsComponent } from './components/developer-dashboard/course-details/course-details.component';
import { AdminDashboardOverviewComponent } from './components/admin-dashboard/admin-dashboard-overview/admin-dashboard-overview.component';
import { DeveloperDashboardOverviewComponent } from './components/developer-dashboard/developer-dashboard-overview/developer-dashboard-overview.component';

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
      { path: 'reports', component: DevReportsComponent },
      { path: 'chatbot', component: DevChatbotComponent },
    ]
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }
];
