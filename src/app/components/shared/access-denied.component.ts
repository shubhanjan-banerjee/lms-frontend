import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen">
      <h1 class="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p class="text-lg text-gray-700 mb-6">You do not have permission to view this page.</p>
      <a routerLink="/login" class="text-blue-600 hover:underline">Return to Login</a>
    </div>
  `,
  styles: []
})
export class AccessDeniedComponent { }
