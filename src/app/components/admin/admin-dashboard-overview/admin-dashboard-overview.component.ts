import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

import { UserService } from '../../../services/user.service';
import { LearningPathService } from '../../../services/learning-path.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatMenuModule,
    MatTooltipModule
  ],
  selector: 'app-admin-dashboard-overview',
  templateUrl: './admin-dashboard-overview.component.html',
  styleUrls: ['./admin-dashboard-overview.component.scss']
})
export class AdminDashboardOverviewComponent {
  currentPage: string = 'dashboard';

  // Mock data for demonstration purposes
  developers: Array<{ id: number; name: string; role: string; skills: string[]; proficiency: string }> = [];

  skillGaps = [
    { developer: 'Alice Johnson', gapSkill: 'TypeScript', requiredProficiency: 'Intermediate', currentProficiency: 'Beginner' },
    { developer: 'Bob Williams', gapSkill: 'AWS', requiredProficiency: 'Intermediate', currentProficiency: 'N/A' },
    { developer: 'Charlie Brown', gapSkill: 'Terraform', requiredProficiency: 'Advanced', currentProficiency: 'Intermediate' },
  ];

  learningPaths: any[] = [];
  carouselIndex = 0;
  carouselSize = 3;

  private colorPalette = [
    '06B6D4', // cyan
    'F59E42', // orange
    '10B981', // green
    '6366F1', // indigo
    'F43F5E', // pink
    'FBBF24', // yellow
    '8B5CF6', // violet
    '3B82F6', // blue
    'EF4444', // red
    '14B8A6', // teal
    'A3E635', // lime
    'F472B6', // fuchsia
    'F87171', // rose
    'FACC15', // amber
    '4ADE80', // emerald
    '818CF8', // indigo-light
    'F472B6', // pink-light
    'FCD34D', // yellow-light
    '60A5FA', // blue-light
    '34D399'  // green-light
  ];
  totalLearningPaths = 0;
  totalDevelopers = 0;

  constructor(private userService: UserService, private learningPathService: LearningPathService, private router: Router) {
    this.loadTopDevelopers();
    this.loadLearningPaths();
  }

  loadTopDevelopers() {
    this.userService.getUsers(0, 10).subscribe(resp => {
      this.totalDevelopers = resp.total || 0; // Assuming the API returns total count
      this.developers = resp.items.map(u => ({
        id: u.id,
        name: u.first_name + ' ' + u.last_name,
        role: u.current_project_role?.name || u.role,
        skills: u.user_skills?.map(s => `${s.skill_name} (${s.proficiency_level_name})`) || [],
        proficiency: u.user_skills && u.user_skills.length ? this.getTopProficiency(u.user_skills) : 'N/A'
      }))
        .filter(u => u.role && u.skills.length > 0)
        .filter(u => {
          return u.role.toLowerCase().includes('developer');
        });
    });
  }

  loadLearningPaths() {
    this.learningPathService.getLearningPaths({
      limit: 20
    }).subscribe(res => {
      this.learningPaths = res.items || [];
      this.totalLearningPaths = res.total || 0; // Assuming the API returns total count
      this.assignColorsToLearningPaths();
    });
  }

  private getRandomColor(): string {
    return this.colorPalette[Math.floor(Math.random() * this.colorPalette.length)];
  }

  private assignColorsToLearningPaths() {
    if (Array.isArray(this.learningPaths)) {
      this.learningPaths.forEach(path => {
        if (!path._color) {
          path._color = this.getRandomColor();
        }
      });
    }
  }

  getTopProficiency(skills: any[]): string {
    // Example: return the highest proficiency level name
    const levels = skills.map(s => s.proficiency_level_name).filter(Boolean);
    return levels[0] || 'N/A';
  }

  nextCarousel() {
    if (this.learningPaths.length > 0) {
      this.carouselIndex = (this.carouselIndex + this.carouselSize) % this.learningPaths.length;
    }
  }

  prevCarousel() {
    if (this.learningPaths.length > 0) {
      this.carouselIndex = (this.carouselIndex - this.carouselSize + this.learningPaths.length) % this.learningPaths.length;
    }
  }

  goToEmployees() {
    this.router.navigate(['/admin/employees']);
  }

  goToLearningPath() {
    this.router.navigate(['/admin/learning-paths']);
  }

  goToLearningPathDetails(id: number) {
    this.router.navigate(['/admin/learning-paths', id]);
  }

  getLearningPathImageUrl(path: any): string {
    if (path.image_url) return path.image_url;
    const color = path._color || 'CCCCCC';
    const text = encodeURIComponent(path.name || 'No Name');
    return `https://placehold.co/400x250/${color}/FFFFFF?text=${text}`;
  }
}
