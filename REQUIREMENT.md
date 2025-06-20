# Project: Account-Specific Learning Management System (LMS) - Frontend Development with Angular

## Overall Goal:
Develop a full-fledged, end-to-end web application frontend for an Account-Specific Learning Management System. This system will track employee skill sets, identify skill gaps, recommend trainings, and facilitate learning path management for both Admins and Developers.

## Development Environment:
- **IDE:** VS Code
- **AI Tool:** GitHub Copilot Agent
- **Frontend Framework:** Angular (latest stable version)
- **Styling Framework:** Tailwind CSS
- **UI Component Library:** Angular Material
- **Authentication:** Mock SSO for frontend demonstration. Backend integration will be separate.
- **Data:** Use mock/dummy data for all frontend components initially.

## Detailed Development Plan for GitHub Copilot Agent:

---

### **Phase 1: Project Setup & Core Structure**

**Task 1.1: Initialize Angular Project and Integrate Tailwind CSS & Angular Material**
- **Action:** Create a new Angular project named `lms-frontend` and set up Tailwind CSS and Angular Material.
- **Instructions:**
    1.  **Run in terminal:** `ng new lms-frontend --routing --style=scss` (Choose SCSS for styling when prompted).
    2.  **Run in terminal:** `cd lms-frontend`
    3.  **Run in terminal:** `ng add @angular/material` (When prompted: Choose 'Deep Purple/Amber' theme, select 'Yes' for Hammer.js, and select 'Yes' to include Angular Material typography styles).
    4.  **Run in terminal:** `npm install -D tailwindcss postcss autoprefixer`
    5.  **Run in terminal:** `npx tailwindcss init -p` (This creates `tailwind.config.js` and `postcss.config.js` in your project root).
    6.  **Modify `tailwind.config.js`:**
        ```javascript
        /** @type {import('tailwindcss').Config} */
        module.exports = {
          content: [
            "./src/**/*.{html,ts}",
          ],
          theme: {
            extend: {
              fontFamily: {
                inter: ['Inter', 'sans-serif'], // Add Inter font
              },
            },
          },
          plugins: [],
        }
        ```
    7.  **Modify `src/styles.scss`:**
        ```scss
        @import '@angular/material/prebuilt-themes/deeppurple-amber.css'; // Or your chosen theme
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        /* General styles for entire app */
        html, body {
            height: 100%;
            margin: 0;
            font-family: 'Inter', sans-serif; /* Apply Inter font globally */
            background-color: #f8fafc; /* Light gray background */
        }
        ```
    8.  **Modify `src/index.html`:** Add the Inter font link in the `<head>` section:
        ```html
        <head>
          <!-- other head content -->
          <link href="[https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap](https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap)" rel="stylesheet">
        </head>
        ```
    9.  **Modify `src/app/app.component.html`:** Replace its default content with just `<router-outlet></router-outlet>`.

**Task 1.2: Implement Basic Routing and Authentication Flow (Mock)**
- **Action:** Create `login` and `admin-dashboard` components and set up routing. Implement a mock authentication service and an authentication guard.
- **Instructions:**
    1.  **Run in terminal:** `ng generate component components/login`
    2.  **Run in terminal:** `ng generate component components/admin-dashboard`
    3.  **Run in terminal:** `ng generate service services/auth`
    4.  **Run in terminal:** `ng generate guard guards/auth` (Select `CanActivate` when prompted).
    5.  **Modify `src/app/app-routing.module.ts`**:
        ```typescript
        import { NgModule } from '@angular/core';
        import { RouterModule, Routes } from '@angular/router';
        import { LoginComponent } from './components/login/login.component';
        import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
        import { AuthGuard } from './guards/auth.guard';
        import { DeveloperDashboardComponent } from './components/developer-dashboard/developer-dashboard.component'; // Will create this later

        const routes: Routes = [
          { path: 'login', component: LoginComponent },
          { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
          { path: 'developer', component: DeveloperDashboardComponent, canActivate: [AuthGuard] }, // Add developer route
          { path: '', redirectTo: '/login', pathMatch: 'full' },
          { path: '**', redirectTo: '/login' } // Wildcard for undefined routes
        ];

        @NgModule({
          imports: [RouterModule.forRoot(routes)],
          exports: [RouterModule]
        })
        export class AppRoutingModule { }
        ```
    6.  **Modify `src/app/services/auth.service.ts`**:
        ```typescript
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
            // In a real app, you'd check a token or session storage here
            const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
            this._isLoggedIn.next(loggedInStatus);
          }

          login(username: string, password: string): Observable<boolean> {
            // Simulate SSO/backend call
            return of(true).pipe( // Always true for mock login
              delay(500),
              tap(success => {
                if (success) {
                  this._isLoggedIn.next(true);
                  localStorage.setItem('isLoggedIn', 'true');
                  // Determine where to navigate based on role (for future)
                  // For now, always navigate to admin dashboard upon successful login
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
        ```
    7.  **Modify `src/app/guards/auth.guard.ts`**:
        ```typescript
        import { Injectable } from '@angular/core';
        import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
        import { Observable } from 'rxjs';
        import { map, take } from 'rxjs/operators';
        import { AuthService } from '../services/auth.service';

        @Injectable({
          providedIn: 'root'
        })
        export class AuthGuard implements CanActivate {
          constructor(private authService: AuthService, private router: Router) {}

          canActivate(
            route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            return this.authService.isLoggedIn$.pipe(
              take(1),
              map(isLoggedIn => {
                if (isLoggedIn) {
                  return true;
                } else {
                  // Redirect to the login page
                  return this.router.createUrlTree(['/login']);
                }
              })
            );
          }
        }
        ```
    8.  **Modify `src/app/components/login/login.component.ts`**:
        ```typescript
        import { Component, OnInit } from '@angular/core';
        import { AuthService } from '../../services/auth.service';
        import { Router } from '@angular/router';
        import { FormControl, FormGroup, Validators } from '@angular/forms'; // For reactive forms

        @Component({
          selector: 'app-login',
          templateUrl: './login.component.html',
          styleUrls: ['./login.component.scss']
        })
        export class LoginComponent implements OnInit {
          loginForm: FormGroup;
          isLoading = false;

          constructor(private authService: AuthService, private router: Router) {
            this.loginForm = new FormGroup({
              username: new FormControl('', Validators.required),
              password: new FormControl('', Validators.required)
            });
          }

          ngOnInit(): void {
            // Optional: If already logged in, redirect
            this.authService.isLoggedIn$.subscribe(loggedIn => {
              if (loggedIn) {
                this.router.navigate(['/admin']); // Or relevant dashboard
              }
            });
          }

          onSubmit(): void {
            if (this.loginForm.valid) {
              this.isLoading = true;
              const { username, password } = this.loginForm.value;
              this.authService.login(username, password).subscribe({
                next: (success) => {
                  this.isLoading = false;
                  if (!success) {
                    // In a real app, display error
                    alert('Login failed. Please check your credentials.'); // Use custom modal in production
                  }
                },
                error: (err) => {
                  this.isLoading = false;
                  console.error('Login error:', err);
                  alert('An error occurred during login. Please try again.'); // Use custom modal in production
                }
              });
            } else {
              alert('Please enter both username and password.'); // Use custom modal in production
            }
          }
        }
        ```
    9.  **Modify `src/app/components/login/login.component.html`**:
        ```html
        <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200">
          <mat-card class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200 transform transition-transform duration-500 hover:scale-105">
            <h2 class="text-4xl font-extrabold text-center text-gray-900 mb-8 animate-bounce-in">Admin Login</h2>
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="w-full mb-6">
                <mat-label>Username (SSO ID)</mat-label>
                <input matInput formControlName="username" placeholder="Your SSO ID" required>
                <mat-error *ngIf="loginForm.get('username')?.invalid && loginForm.get('username')?.touched">
                  Username is required.
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full mb-8">
                <mat-label>Password</mat-label>
                <input matInput formControlName="password" type="password" placeholder="************" required>
                <mat-error *ngIf="loginForm.get('password')?.invalid && loginForm.get('password')?.touched">
                  Password is required.
                </mat-error>
              </mat-form-field>

              <button
                mat-raised-button
                color="primary"
                type="submit"
                class="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 shadow-lg transform transition-all duration-300 hover:scale-105"
                [disabled]="isLoading"
              >
                <span *ngIf="!isLoading">Log In</span>
                <mat-spinner *ngIf="isLoading" [diameter]="24" class="mx-auto"></mat-spinner>
              </button>
            </form>
            <p class="mt-6 text-center text-gray-600 text-sm">
              This is a simulated login for demonstration. In production, this integrates with your SSO provider.
            </p>
          </mat-card>
        </div>
        ```
    10. **Modify `src/app/app.module.ts`**: Import necessary Angular Material modules and `ReactiveFormsModule`.
        ```typescript
        import { NgModule } from '@angular/core';
        import { BrowserModule } from '@angular/platform-browser';
        import { AppRoutingModule } from './app-routing.module';
        import { AppComponent } from './app.component';
        import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
        import { LoginComponent } from './components/login/login.component';
        import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
        import { DeveloperDashboardComponent } from './components/developer-dashboard/developer-dashboard.component'; // Import this
        import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import ReactiveFormsModule and FormsModule

        // Angular Material Imports
        import { MatCardModule } from '@angular/material/card';
        import { MatInputModule } from '@angular/material/input';
        import { MatButtonModule } from '@angular/material/button';
        import { MatFormFieldModule } from '@angular/material/form-field';
        import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
        import { MatTableModule } from '@angular/material/table';
        import { MatMenuModule } from '@angular/material/menu';
        import { MatIconModule } from '@angular/material/icon';
        import { MatTooltipModule } from '@angular/material/tooltip';

        @NgModule({
          declarations: [
            AppComponent,
            LoginComponent,
            AdminDashboardComponent,
            DeveloperDashboardComponent
          ],
          imports: [
            BrowserModule,
            AppRoutingModule,
            BrowserAnimationsModule,
            ReactiveFormsModule, // Add ReactiveFormsModule
            FormsModule, // Add FormsModule (often needed with Material)
            // Angular Material Modules
            MatCardModule,
            MatInputModule,
            MatButtonModule,
            MatFormFieldModule,
            MatProgressSpinnerModule,
            MatTableModule,
            MatMenuModule,
            MatIconModule,
            MatTooltipModule
          ],
          providers: [],
          bootstrap: [AppComponent]
        })
        export class AppModule { }
        ```

---

### **Phase 2: Admin Dashboard Features**

**Task 2.1: Admin Dashboard Layout (Sidebar + Content Area)**
- **Action:** Design the main layout for the Admin Dashboard with a static sidebar navigation and a dynamic content area.
- **Instructions:**
    1.  **Modify `src/app/components/admin-dashboard/admin-dashboard.component.ts`**:
        ```typescript
        import { Component, OnInit } from '@angular/core';
        import { AuthService } from '../../services/auth.service';
        import { Router } from '@angular/router';

        @Component({
          selector: 'app-admin-dashboard',
          templateUrl: './admin-dashboard.component.html',
          styleUrls: ['./admin-dashboard.component.scss']
        })
        export class AdminDashboardComponent implements OnInit {
          currentPage: string = 'dashboard'; // State to manage current view in dashboard

          // Mock data for demonstration purposes
          developers = [
            { id: 'dev001', name: 'Alice Johnson', role: 'Frontend Dev', skills: ['React', 'JavaScript', 'HTML', 'CSS'], proficiency: 'Intermediate' },
            { id: 'dev002', name: 'Bob Williams', role: 'Backend Dev', skills: ['Python', 'SQL', 'FastAPI'], proficiency: 'Advanced' },
            { id: 'dev003', name: 'Charlie Brown', role: 'DevOps Eng', skills: ['AWS', 'Docker', 'Kubernetes'], proficiency: 'Intermediate' },
            { id: 'dev004', name: 'Diana Miller', role: 'Fullstack Dev', skills: ['Angular', 'TypeScript', 'Node.js'], proficiency: 'Beginner' },
          ];

          skillGaps = [
            { developer: 'Alice Johnson', gapSkill: 'TypeScript', requiredProficiency: 'Intermediate', currentProficiency: 'Beginner' },
            { developer: 'Bob Williams', gapSkill: 'AWS', requiredProficiency: 'Intermediate', currentProficiency: 'N/A' },
            { developer: 'Charlie Brown', gapSkill: 'Terraform', requiredProficiency: 'Advanced', currentProficiency: 'Intermediate' },
          ];

          learningPaths = [
            {
              id: 'lp001',
              title: 'Advanced React Development',
              description: 'Deep dive into React hooks, context API, and performance optimization.',
              image: '[https://placehold.co/400x250/06B6D4/FFFFFF?text=React+Dev](https://placehold.co/400x250/06B6D4/FFFFFF?text=React+Dev)',
              skillsCovered: ['React', 'JavaScript', 'State Management'],
              status: 'Active',
            },
            {
              id: 'lp002',
              title: 'Python FastAPI Microservices',
              description: 'Build scalable and robust APIs using Python FastAPI.',
              image: '[https://placehold.co/400x250/FACC15/0F172A?text=FastAPI](https://placehold.co/400x250/FACC15/0F172A?text=FastAPI)',
              skillsCovered: ['Python', 'FastAPI', 'REST APIs'],
              status: 'New',
            },
            {
              id: 'lp003',
              title: 'Cloud Security Fundamentals (AWS)',
              description: 'Understand the core concepts of cloud security in AWS.',
              image: '[https://placehold.co/400x250/10B981/FFFFFF?text=AWS+Security](https://placehold.co/400x250/10B981/FFFFFF?text=AWS+Security)',
              skillsCovered: ['AWS', 'Cloud Security'],
              status: 'Popular',
            },
            {
              id: 'lp004',
              title: 'Angular State Management with NgRx',
              description: 'Master state management in Angular applications using NgRx.',
              image: '[https://placehold.co/400x250/EF4444/FFFFFF?text=Angular+NgRx](https://placehold.co/400x250/EF4444/FFFFFF?text=Angular+NgRx)',
              skillsCovered: ['Angular', 'NgRx', 'TypeScript'],
              status: 'Upcoming',
            },
          ];

          constructor(private authService: AuthService, private router: Router) { }

          ngOnInit(): void {
          }

          logout(): void {
            this.authService.logout();
          }

          setPage(page: string): void {
            this.currentPage = page;
          }
        }
        ```
    2.  **Modify `src/app/components/admin-dashboard/admin-dashboard.component.html`**:
        ```html
        <div class="flex h-screen bg-gray-100 font-inter">
          <!-- Sidebar Navigation -->
          <div class="w-64 bg-gradient-to-b from-gray-800 to-gray-900 text-white p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div class="text-2xl font-extrabold text-indigo-300 mb-10">LMS Admin</div>
              <nav>
                <ul>
                  <li class="mb-4">
                    <button
                      (click)="setPage('dashboard')"
                      class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200"
                      [ngClass]="{'bg-indigo-700 text-white shadow-md': currentPage === 'dashboard', 'hover:bg-gray-700 text-gray-300': currentPage !== 'dashboard'}"
                    >
                      <mat-icon class="align-middle mr-2">dashboard</mat-icon> Dashboard
                    </button>
                  </li>
                  <li class="mb-4">
                    <button
                      (click)="setPage('employees')"
                      class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200"
                      [ngClass]="{'bg-indigo-700 text-white shadow-md': currentPage === 'employees', 'hover:bg-gray-700 text-gray-300': currentPage !== 'employees'}"
                    >
                      <mat-icon class="align-middle mr-2">group</mat-icon> Employees
                    </button>
                  </li>
                  <li class="mb-4">
                    <button
                      (click)="setPage('skills')"
                      class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200"
                      [ngClass]="{'bg-indigo-700 text-white shadow-md': currentPage === 'skills', 'hover:bg-gray-700 text-gray-300': currentPage !== 'skills'}"
                    >
                      <mat-icon class="align-middle mr-2">star</mat-icon> Skills & Roles
                    </button>
                  </li>
                  <li class="mb-4">
                    <button
                      (click)="setPage('learningPaths')"
                      class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200"
                      [ngClass]="{'bg-indigo-700 text-white shadow-md': currentPage === 'learningPaths', 'hover:bg-gray-700 text-gray-300': currentPage !== 'learningPaths'}"
                    >
                      <mat-icon class="align-middle mr-2">book</mat-icon> Learning Paths
                    </button>
                  </li>
                  <li class="mb-4">
                    <button
                      (click)="setPage('reports')"
                      class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200"
                      [ngClass]="{'bg-indigo-700 text-white shadow-md': currentPage === 'reports', 'hover:bg-gray-700 text-gray-300': currentPage !== 'reports'}"
                    >
                      <mat-icon class="align-middle mr-2">bar_chart</mat-icon> Reports
                    </button>
                  </li>
                  <li class="mb-4">
                    <button
                      (click)="setPage('chatbot')"
                      class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200"
                      [ngClass]="{'bg-indigo-700 text-white shadow-md': currentPage === 'chatbot', 'hover:bg-gray-700 text-gray-300': currentPage !== 'chatbot'}"
                    >
                      <mat-icon class="align-middle mr-2">chat</mat-icon> Chatbot
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="mt-auto">
              <button
                (click)="logout()"
                class="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300"
              >
                <mat-icon class="align-middle mr-2">logout</mat-icon> Log Out
              </button>
            </div>
          </div>

          <!-- Main Content Area -->
          <main class="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
            <h1 class="text-4xl font-extrabold text-gray-900 mb-8 text-center animate-fade-in">Admin Dashboard</h1>

            <div [ngSwitch]="currentPage">
              <ng-container *ngSwitchCase="'dashboard'">
                <!-- Content for Dashboard Overview -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                      <div class="text-5xl text-blue-600 mb-2">📊</div>
                      <h3 class="text-xl font-semibold text-gray-800">Total Developers</h3>
                      <p class="text-4xl font-bold text-indigo-700">150</p>
                  </div>
                  <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                      <div class="text-5xl text-green-600 mb-2">🎓</div>
                      <h3 class="text-xl font-semibold text-gray-800">Courses Available</h3>
                      <p class="text-4xl font-bold text-emerald-700">75</p>
                  </div>
                  <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                      <div class="text-5xl text-yellow-600 mb-2">🚧</div>
                      <h3 class="text-xl font-semibold text-gray-800">Skill Gaps Identified</h3>
                      <p class="text-4xl font-bold text-amber-700">230</p>
                  </div>
                  <div class="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transform hover:scale-105 transition-transform duration-300">
                      <div class="text-5xl text-red-600 mb-2">⚠️</div>
                      <h3 class="text-xl font-semibold text-gray-800">Lagging Progress</h3>
                      <p class="text-4xl font-bold text-rose-700">45</p>
                  </div>
                </div>

                <!-- Developers & Skill Gaps Section -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                    <!-- User Management Section -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <mat-icon class="mr-2 text-indigo-500">people</mat-icon> Employee Skill Profiles
                        </h2>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Developer</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skills</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Proficiency</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr *ngFor="let dev of developers" class="hover:bg-gray-50 transition duration-150 ease-in-out">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ dev.name }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ dev.role }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            <span *ngFor="let skill of dev.skills" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-1 mb-1">
                                                {{ skill }}
                                            </span>
                                        </td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ dev.proficiency }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button mat-raised-button color="primary" class="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300">
                            Manage Employees
                        </button>
                    </div>

                    <!-- Skill Gap Analysis Section -->
                    <div class="bg-white rounded-xl shadow-lg p-6">
                        <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                            <mat-icon class="mr-2 text-red-500">warning</mat-icon> Identified Skill Gaps
                        </h2>
                        <div class="overflow-x-auto">
                            <table class="min-w-full divide-y divide-gray-200">
                                <thead class="bg-gray-50">
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Developer</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skill Gap</th>
                                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Required / Current</th>
                                    </tr>
                                </thead>
                                <tbody class="bg-white divide-y divide-gray-200">
                                    <tr *ngFor="let gap of skillGaps; index as i" class="hover:bg-gray-50 transition duration-150 ease-in-out">
                                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ gap.developer }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-semibold">{{ gap.gapSkill }}</td>
                                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{{ gap.requiredProficiency }} / {{ gap.currentProficiency }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button mat-raised-button color="accent" class="mt-4 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition duration-300">
                            Analyze Gaps
                        </button>
                    </div>
                </div>

                <!-- Learning Paths / Courses Section - Pictorial Representation -->
                <div class="bg-white rounded-xl shadow-lg p-6 mb-10">
                    <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <mat-icon class="mr-2 text-green-500">library_books</mat-icon> Learning Paths & Courses
                    </h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <mat-card *ngFor="let path of learningPaths" class="bg-gray-50 rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer border border-gray-200">
                            <img [src]="path.image" [alt]="path.title" class="w-full h-40 object-cover" onerror="this.onerror=null;this.src='[https://placehold.co/400x250/CCCCCC/666666?text=Image+Error](https://placehold.co/400x250/CCCCCC/666666?text=Image+Error)';" />
                            <mat-card-content class="p-4">
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ path.title }}</h3>
                                <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ path.description }}</p>
                                <div class="flex flex-wrap gap-1 mb-3">
                                    <span *ngFor="let skill of path.skillsCovered" class="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full">
                                        {{ skill }}
                                    </span>
                                </div>
                                <span [ngClass]="{
                                    'bg-green-100 text-green-800': path.status === 'Active',
                                    'bg-blue-100 text-blue-800': path.status === 'New',
                                    'bg-amber-100 text-amber-800': path.status === 'Popular',
                                    'bg-gray-100 text-gray-800': path.status === 'Upcoming'
                                }" class="px-3 py-1 text-sm font-semibold rounded-full">
                                    {{ path.status }}
                                </span>
                                <button mat-raised-button color="accent" class="mt-4 w-full bg-emerald-600 text-white font-semibold rounded-lg shadow-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-300">
                                    View Details
                                </button>
                            </mat-card-content>
                        </mat-card>
                    </div>
                    <button mat-raised-button color="primary" class="mt-6 px-6 py-3 bg-fuchsia-600 text-white font-semibold rounded-lg shadow-md hover:bg-fuchsia-700 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 transition duration-300 text-lg">
                        Manage Learning Paths
                    </button>
                </div>

                <!-- Role-Skill Swapping Suggestion -->
                <div class="bg-white rounded-xl shadow-lg p-6 mb-10">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <mat-icon class="mr-2 text-orange-500">swap_horiz</mat-icon> Role-Skill Swap Suggestions
                    </h2>
                    <p class="text-gray-700 mb-4">
                        The system can suggest optimal role-skill combinations to reduce overall skill gaps within the team. For example:
                    </p>
                    <div class="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-md">
                        <p class="text-sm text-orange-700 font-semibold">
                            Suggestion: Employee X (currently Backend Dev) might be a better fit for the project role requiring strong Cloud Security skills, which Employee Y currently has but isn't utilizing fully in their Frontend Dev role.
                        </p>
                    </div>
                    <button mat-raised-button color="warn" class="mt-4 px-4 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-300">
                        Explore Swaps
                    </button>
                </div>

                <!-- Admin Chatbot Interface -->
                <div class="bg-white rounded-xl shadow-lg p-6 mb-10">
                    <h2 class="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                        <mat-icon class="mr-2 text-cyan-500">smart_toy</mat-icon> Admin Chatbot
                    </h2>
                    <p class="text-gray-700 mb-4">
                        Interact with the chatbot to get quick information on enrollment and course completion.
                    </p>
                    <div class="flex items-center">
                        <mat-form-field appearance="outline" class="flex-grow">
                          <mat-label>Ask the Chatbot</mat-label>
                          <input matInput placeholder='e.g., "Provide me the course wise completion % for employee ID 123456"'>
                        </mat-form-field>
                        <button mat-raised-button color="primary" class="px-6 py-2 bg-cyan-600 text-white font-semibold rounded-r-lg shadow-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 transition duration-300">
                            <mat-icon class="mr-1">send</mat-icon> Ask
                        </button>
                    </div>
                    <div class="mt-4 p-3 bg-gray-100 rounded-lg text-gray-700 text-sm italic">
                        <p>Chatbot responses will appear here...</p>
                    </div>
                </div>
              </ng-container>

              <!-- Placeholders for other pages -->
              <ng-container *ngSwitchCase="'employees'">
                <div class="p-6 text-2xl font-bold text-gray-800 bg-white rounded-xl shadow-lg">
                  <h2 class="text-3xl mb-4 flex items-center"><mat-icon class="mr-2">group</mat-icon> Manage Employees</h2>
                  <p>This section will allow admins to manage employee profiles, roles, and assign individual skills manually.</p>
                  <button mat-raised-button color="primary" class="mt-4">Go to Employee Details</button>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'skills'">
                <div class="p-6 text-2xl font-bold text-gray-800 bg-white rounded-xl shadow-lg">
                  <h2 class="text-3xl mb-4 flex items-center"><mat-icon class="mr-2">star</mat-icon> Skills & Roles Management</h2>
                  <p>Here, admins can define and manage skill definitions, proficiency levels, and role-skill matrices, including uploading via Excel.</p>
                  <button mat-raised-button color="primary" class="mt-4">Upload Skill Matrix</button>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'learningPaths'">
                <div class="p-6 text-2xl font-bold text-gray-800 bg-white rounded-xl shadow-lg">
                  <h2 class="text-3xl mb-4 flex items-center"><mat-icon class="mr-2">book</mat-icon> Learning Path Configuration</h2>
                  <p>This section will allow admins to create, edit, and assign learning paths and courses to individuals or in bulk.</p>
                  <button mat-raised-button color="primary" class="mt-4">Create New Learning Path</button>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'reports'">
                <div class="p-6 text-2xl font-bold text-gray-800 bg-white rounded-xl shadow-lg">
                  <h2 class="text-3xl mb-4 flex items-center"><mat-icon class="mr-2">bar_chart</mat-icon> Performance Reports</h2>
                  <p>Access detailed reports on course completion rates, skill gap compliance, and individual progress tracking.</p>
                  <button mat-raised-button color="primary" class="mt-4">Generate Report</button>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'chatbot'">
                <div class="p-6 text-2xl font-bold text-gray-800 bg-white rounded-xl shadow-lg">
                  <h2 class="text-3xl mb-4 flex items-center"><mat-icon class="mr-2">smart_toy</mat-icon> Interactive Admin Chatbot</h2>
                  <p>This dedicated page for the chatbot will provide a larger interface for asking complex queries about employee data, training progress, and compliance.</p>
                  <button mat-raised-button color="primary" class="mt-4">Open Chat Interface</button>
                </div>
              </ng-container>
            </div>
          </main>
        </div>
        ```

---

### **Phase 3: Developer Dashboard Features (Placeholders for now)**

**Task 3.1: Developer Dashboard Views**
- **Action:** Create the `developer-dashboard` component and implement its basic layout with navigation.
- **Instructions:**
    1.  **Run in terminal:** `ng generate component components/developer-dashboard` (if not already created in Task 1.2).
    2.  **Modify `src/app/components/developer-dashboard/developer-dashboard.component.ts`**:
        ```typescript
        import { Component, OnInit } from '@angular/core';
        import { AuthService } from '../../services/auth.service';
        import { Router } from '@angular/router';

        @Component({
          selector: 'app-developer-dashboard',
          templateUrl: './developer-dashboard.component.html',
          styleUrls: ['./developer-dashboard.component.scss']
        })
        export class DeveloperDashboardComponent implements OnInit {
          currentPage: string = 'my-courses'; // Default developer view

          constructor(private authService: AuthService, private router: Router) { }

          ngOnInit(): void {
          }

          logout(): void {
            this.authService.logout();
          }

          setPage(page: string): void {
            this.currentPage = page;
          }
        }
        ```
    3.  **Modify `src/app/components/developer-dashboard/developer-dashboard.component.html`**:
        ```html
        <div class="flex h-screen bg-gray-100 font-inter">
          <!-- Sidebar Navigation -->
          <div class="w-64 bg-gradient-to-b from-blue-800 to-blue-900 text-white p-6 shadow-xl flex flex-col justify-between">
            <div>
              <div class="text-2xl font-extrabold text-cyan-300 mb-10">LMS Developer</div>
              <nav>
                <ul>
                  <li class="mb-4">
                    <button
                      (click)="setPage('my-courses')"
                      class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200"
                      [ngClass]="{'bg-blue-700 text-white shadow-md': currentPage === 'my-courses', 'hover:bg-blue-600 text-gray-300': currentPage !== 'my-courses'}"
                    >
                      <mat-icon class="align-middle mr-2">playlist_add_check</mat-icon> My Courses
                    </button>
                  </li>
                  <li class="mb-4">
                    <button
                      (click)="setPage('mandatory')"
                      class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200"
                      [ngClass]="{'bg-blue-700 text-white shadow-md': currentPage === 'mandatory', 'hover:bg-blue-600 text-gray-300': currentPage !== 'mandatory'}"
                    >
                      <mat-icon class="align-middle mr-2">assignment</mat-icon> Mandatory Learning
                    </button>
                  </li>
                  <li class="mb-4">
                    <button
                      (click)="setPage('optional')"
                      class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200"
                      [ngClass]="{'bg-blue-700 text-white shadow-md': currentPage === 'optional', 'hover:bg-blue-600 text-gray-300': currentPage !== 'optional'}"
                    >
                      <mat-icon class="align-middle mr-2">lightbulb</mat-icon> Optional Courses
                    </button>
                  </li>
                  <li class="mb-4">
                    <button
                      (click)="setPage('popular')"
                      class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200"
                      [ngClass]="{'bg-blue-700 text-white shadow-md': currentPage === 'popular', 'hover:bg-blue-600 text-gray-300': currentPage !== 'popular'}"
                    >
                      <mat-icon class="align-middle mr-2">trending_up</mat-icon> Popular Courses
                    </button>
                  </li>
                  <li class="mb-4">
                    <button
                      (click)="setPage('progress')"
                      class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200"
                      [ngClass]="{'bg-blue-700 text-white shadow-md': currentPage === 'progress', 'hover:bg-blue-600 text-gray-300': currentPage !== 'progress'}"
                    >
                      <mat-icon class="align-middle mr-2">track_changes</mat-icon> My Progress
                    </button>
                  </li>
                  <li class="mb-4">
                    <button
                      (click)="setPage('chatbot')"
                      class="w-full text-left px-4 py-2 rounded-lg transition-colors duration-200"
                      [ngClass]="{'bg-blue-700 text-white shadow-md': currentPage === 'chatbot', 'hover:bg-blue-600 text-gray-300': currentPage !== 'chatbot'}"
                    >
                      <mat-icon class="align-middle mr-2">chat_bubble</mat-icon> Chatbot
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
            <div class="mt-auto">
              <button
                (click)="logout()"
                class="w-full flex items-center justify-center px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-300"
              >
                <mat-icon class="align-middle mr-2">logout</mat-icon> Log Out
              </button>
            </div>
          </div>

          <!-- Main Content Area for Developer Dashboard -->
          <main class="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-blue-50 to-indigo-100">
            <h1 class="text-4xl font-extrabold text-gray-900 mb-8 text-center animate-fade-in">Developer Dashboard</h1>

            <div [ngSwitch]="currentPage">
              <ng-container *ngSwitchCase="'my-courses'">
                <div class="p-6 text-2xl font-bold text-gray-800 bg-white rounded-xl shadow-lg">
                  <h2 class="text-3xl mb-4 flex items-center"><mat-icon class="mr-2">playlist_add_check</mat-icon> My Registered Courses</h2>
                  <p>View courses and learning paths you have already registered for.</p>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'mandatory'">
                <div class="p-6 text-2xl font-bold text-gray-800 bg-white rounded-xl shadow-lg">
                  <h2 class="text-3xl mb-4 flex items-center"><mat-icon class="mr-2">assignment</mat-icon> Mandatory Learning Paths</h2>
                  <p>Courses identified by the system that you are yet to register for.</p>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'optional'">
                <div class="p-6 text-2xl font-bold text-gray-800 bg-white rounded-xl shadow-lg">
                  <h2 class="text-3xl mb-4 flex items-center"><mat-icon class="mr-2">lightbulb</mat-icon> Optional Recommended Courses</h2>
                  <p>Explore optional courses recommended by the system based on your profile.</p>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'popular'">
                <div class="p-6 text-2xl font-bold text-gray-800 bg-white rounded-xl shadow-lg">
                  <h2 class="text-3xl mb-4 flex items-center"><mat-icon class="mr-2">trending_up</mat-icon> Popular Courses</h2>
                  <p>See courses popular among your peers and register if interested.</p>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'progress'">
                <div class="p-6 text-2xl font-bold text-gray-800 bg-white rounded-xl shadow-lg">
                  <h2 class="text-3xl mb-4 flex items-center"><mat-icon class="mr-2">track_changes</mat-icon> My Learning Progress</h2>
                  <p>Track your individual and combined progress on all your enrolled courses.</p>
                </div>
              </ng-container>

              <ng-container *ngSwitchCase="'chatbot'">
                <div class="p-6 text-2xl font-bold text-gray-800 bg-white rounded-xl shadow-lg">
                  <h2 class="text-3xl mb-4 flex items-center"><mat-icon class="mr-2">chat_bubble</mat-icon> My Learning Chatbot</h2>
                  <p>Ask the chatbot questions about your personal learning journey and progress.</p>
                  <p class="text-base text-red-600">Note: This chatbot will NOT show other users' learning data.</p>
                </div>
              </ng-container>
            </div>
          </main>
        </div>
        ```

---

### **General Instructions for Copilot Agent:**

1.  **Code Quality:** Ensure clean, well-structured, and idiomatic Angular code. Follow Angular best practices for components, services, and modules.
2.  **Comments:** Add comments to explain complex logic, component purpose, and the use of mock data.
3.  **Error Handling (Frontend):** For form submissions and other interactive elements, use Angular Material's error display mechanisms or simple `alert()` for this demo, but include comments indicating that custom modal UI should be used in production instead of `alert()`.
4.  **Responsiveness:** Use Tailwind CSS utility classes extensively for responsive design (`sm:`, `md:`, `lg:` prefixes) to ensure the layout adapts well to different screen sizes.
5.  **Dummy Data:** All data displayed should be mock/dummy data hardcoded in the components for initial frontend development.
6.  **Import Modules:** Ensure all necessary Angular Material modules (like `MatCardModule`, `MatInputModule`, `MatButtonModule`, `MatFormFieldModule`, `MatProgressSpinnerModule`, `MatTableModule`, `MatMenuModule`, `MatIconModule`, `MatTooltipModule`, etc.) and `ReactiveFormsModule` are correctly imported into `src/app/app.module.ts`. Use `MatIconModule` for the icons shown in the dashboard.
7.  **CSS Animations:** For subtle UI enhancements, consider adding simple CSS animations (e.g., `animate-fade-in`, `animate-bounce-in` for titles, which you might define in `styles.scss` or `tailwind.config.js` if Tailwind doesn't have them built-in, or use `transition` classes directly for hover effects).

**After generating the code for each task, please provide instructions on how to continue to the next task or how to run the application (e.g., `npm install`, `ng serve`).**

Let's begin by following these instructions step by step.
