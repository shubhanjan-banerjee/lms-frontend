import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
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
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  currentPage: string = 'dashboard';

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
      image: 'https://placehold.co/400x250/06B6D4/FFFFFF?text=React+Dev',
      skillsCovered: ['React', 'JavaScript', 'State Management'],
      status: 'Active',
    },
    {
      id: 'lp002',
      title: 'Python FastAPI Microservices',
      description: 'Build scalable and robust APIs using Python FastAPI.',
      image: 'https://placehold.co/400x250/FACC15/0F172A?text=FastAPI',
      skillsCovered: ['Python', 'FastAPI', 'REST APIs'],
      status: 'New',
    },
    {
      id: 'lp003',
      title: 'Cloud Security Fundamentals (AWS)',
      description: 'Understand the core concepts of cloud security in AWS.',
      image: 'https://placehold.co/400x250/10B981/FFFFFF?text=AWS+Security',
      skillsCovered: ['AWS', 'Cloud Security'],
      status: 'Popular',
    },
    {
      id: 'lp004',
      title: 'Angular State Management with NgRx',
      description: 'Master state management in Angular applications using NgRx.',
      image: 'https://placehold.co/400x250/EF4444/FFFFFF?text=Angular+NgRx',
      skillsCovered: ['Angular', 'NgRx', 'TypeScript'],
      status: 'Upcoming',
    },
  ];

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void { }

  logout(): void {
    this.authService.logout();
  }

  setPage(page: string): void {
    this.currentPage = page;
  }
}
