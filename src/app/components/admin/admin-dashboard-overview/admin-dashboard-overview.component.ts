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


  // Dummy users with learning progress
  users = [
    { id: 1, name: 'Alice Johnson', role: 'Developer', progress: 80 },
    { id: 2, name: 'Bob Williams', role: 'Developer', progress: 60 },
    { id: 3, name: 'Charlie Brown', role: 'Developer', progress: 95 },
    { id: 4, name: 'Dana Lee', role: 'Developer', progress: 40 },
    { id: 5, name: 'Eve Smith', role: 'Developer', progress: 100 }
  ];

  // For details view
  selectedLearningPath: any = null;

  // Overall progress (average)
  get overallProgress(): number {
    if (!this.users.length) return 0;
    return Math.round(this.users.reduce((sum, u) => sum + u.progress, 0) / this.users.length);
  }

  showLearningPathDetails(lp: any) {
    this.selectedLearningPath = lp;
  }

  closeLearningPathDetails() {
    this.selectedLearningPath = null;
  }

  // --- New dummy data and logic for enhanced admin dashboard ---

  // New: Overall progress for all users (already present as overallProgress getter)
  // New: Learning path registration and per-user completion (already present as learningPaths and selectedLearningPath)
  // If you want to keep both old and new, you can use new property names or sections in the template.
  // For demonstration, let's add a new set of learning paths and users for the new UI section:

  extraUsers = [
    { id: 6, name: 'Frank Miller', role: 'Developer', progress: 70 },
    { id: 7, name: 'Grace Hopper', role: 'Developer', progress: 85 }
  ];

  extraLearningPaths = [
    {
      id: 201,
      name: 'DevOps Essentials',
      description: 'CI/CD, Docker, and Kubernetes basics.',
      registeredUsersCount: 2,
      users: [
        { id: 6, name: 'Frank Miller', completion: 70 },
        { id: 7, name: 'Grace Hopper', completion: 85 }
      ]
    },
    {
      id: 202,
      name: 'AI Fundamentals',
      description: 'Machine learning and AI basics for developers.',
      registeredUsersCount: 1,
      users: [
        { id: 7, name: 'Grace Hopper', completion: 85 }
      ]
    }
  ];

  extraSelectedLearningPath: any = null;

  get extraOverallProgress(): number {
    if (!this.extraUsers.length) return 0;
    return Math.round(this.extraUsers.reduce((sum, u) => sum + u.progress, 0) / this.extraUsers.length);
  }

  showExtraLearningPathDetails(lp: any) {
    this.extraSelectedLearningPath = lp;
  }

  closeExtraLearningPathDetails() {
    this.extraSelectedLearningPath = null;
  }

  // Dummy data for role-skill swap suggestions
  roleSkillSwaps = [
    {
      employee: 'Alice Johnson',
      currentRole: 'Backend Developer',
      suggestedRole: 'Cloud Security Engineer',
      skill: 'Cloud Security',
      reason: 'Has strong Cloud Security skills not fully utilized in current role.'
    },
    {
      employee: 'Bob Williams',
      currentRole: 'Frontend Developer',
      suggestedRole: 'DevOps Engineer',
      skill: 'CI/CD',
      reason: 'Demonstrated advanced CI/CD skills in recent projects.'
    },
    {
      employee: 'Charlie Brown',
      currentRole: 'QA Engineer',
      suggestedRole: 'Backend Developer',
      skill: 'Node.js',
      reason: 'High proficiency in Node.js, suitable for backend tasks.'
    },
    {
      employee: 'Dana Lee',
      currentRole: 'Data Analyst',
      suggestedRole: 'AI Engineer',
      skill: 'Machine Learning',
      reason: 'Completed multiple ML courses and projects.'
    }
  ];
}
