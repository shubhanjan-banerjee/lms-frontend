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
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.scss']
})
export class DashboardOverviewComponent {
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
      title: 'React Level 1',
      description: 'Deep dive into React hooks, context API, and performance optimization.',
      image: 'https://placehold.co/400x250/06B6D4/FFFFFF?text=React+Dev',
      skillsCovered: ['React', 'JavaScript', 'State Management'],
      status: 'Active',
    },
    {
      id: 'lp002',
      title: 'Dot Net Level 1',
      description: 'Build scalable and robust APIs using .Net features',
      image: 'https://placehold.co/400x250/FACC15/0F172A?text=Dot Net Dev',
      skillsCovered: ['Python', 'FastAPI', 'REST APIs'],
      status: 'New',
    },
    {
      id: 'lp003',
      title: 'Cloud AWS Fundamentals Level 1',
      description: 'Understand the core concepts of cloud security in AWS.',
      image: 'https://placehold.co/400x250/10B981/FFFFFF?text=AWS+Basics',
      skillsCovered: ['AWS', 'Cloud Security'],
      status: 'Popular',
    },
    {
      id: 'lp004',
      title: 'Angular Level 2',
      description: 'Master state management in Angular applications using NgRx.',
      image: 'https://placehold.co/400x250/EF4444/FFFFFF?text=Angular+Dev',
      skillsCovered: ['Angular', 'NgRx', 'TypeScript'],
      status: 'Upcoming',
    },
  ];
}
