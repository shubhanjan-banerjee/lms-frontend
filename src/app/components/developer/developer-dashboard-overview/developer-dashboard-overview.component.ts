import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LearningPathService } from '../../../services/learning-path.service';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { UserResponse } from '../../../models/user.model';
import { UserLearningPathResponse, UserCourseProgressResponse } from '../../../models/learning-path.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-developer-dashboard-overview',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, HttpClientModule],
  templateUrl: './developer-dashboard-overview.component.html',
  styleUrls: ['./developer-dashboard-overview.component.scss']
})
export class DeveloperDashboardOverviewComponent implements OnInit {
  user: UserResponse | null = null;
  userLearningPaths: UserLearningPathResponse[] = [];
  mandatoryLearningPaths: UserLearningPathResponse[] = [];
  recommendedLearningPaths: UserLearningPathResponse[] = [];
  learningPathProgress: { [lpId: number]: number } = {};
  loading = true;
  error: string | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private learningPathService: LearningPathService
  ) { }

  ngOnInit() {
    // this.fetchUserAndLearningPaths();
    this.fillDummyData();
  }

  fillDummyData() {
    this.loading = false;
    this.error = null;
    this.user = {
      sso_id: 'dev123',
      email: 'dev@example.com',
      first_name: 'Dev',
      last_name: 'User',
      password: '',
      id: 1,
      role: 'developer',
      date_joined: '2024-01-01',
      user_skills: [],
      user_learning_paths: [],
      user_course_progress: []
    };
    this.userLearningPaths = [
      {
        id: 1,
        user_id: 1,
        learning_path_id: 101,
        assigned_date: '2024-06-01',
        status: 'in_progress',
        completion_date: undefined,
        is_mandatory_by_system: true,
        is_registered_by_developer: false,
        learning_path: {
          id: 101,
          name: 'Mandatory Path 1',
          description: 'Complete this to stay compliant.',
          courses: [
            { id: 1, learning_path_id: 101, course_id: 201, sequence_order: 1, course: {} },
            { id: 2, learning_path_id: 101, course_id: 202, sequence_order: 2, course: {} }
          ]
        }
      },
      {
        id: 2,
        user_id: 1,
        learning_path_id: 102,
        assigned_date: '2024-06-10',
        status: 'not_started',
        completion_date: undefined,
        is_mandatory_by_system: false,
        is_registered_by_developer: true,
        learning_path: {
          id: 102,
          name: 'Recommended Path A',
          description: 'Grow your skills with this path.',
          courses: [
            { id: 3, learning_path_id: 102, course_id: 203, sequence_order: 1, course: {} }
          ]
        }
      },
      {
        id: 3,
        user_id: 1,
        learning_path_id: 103,
        assigned_date: '2024-06-15',
        status: 'completed',
        completion_date: '2024-06-30',
        is_mandatory_by_system: true,
        is_registered_by_developer: false,
        learning_path: {
          id: 103,
          name: 'Mandatory Path 2',
          description: 'Security and compliance essentials.',
          courses: [
            { id: 4, learning_path_id: 103, course_id: 204, sequence_order: 1, course: {} },
            { id: 5, learning_path_id: 103, course_id: 205, sequence_order: 2, course: {} }
          ]
        }
      },
      {
        id: 4,
        user_id: 1,
        learning_path_id: 104,
        assigned_date: '2024-07-01',
        status: 'in_progress',
        completion_date: undefined,
        is_mandatory_by_system: false,
        is_registered_by_developer: true,
        learning_path: {
          id: 104,
          name: 'Recommended Path B',
          description: 'Advanced TypeScript and Angular.',
          courses: [
            { id: 6, learning_path_id: 104, course_id: 206, sequence_order: 1, course: {} },
            { id: 7, learning_path_id: 104, course_id: 207, sequence_order: 2, course: {} }
          ]
        }
      },
      {
        id: 5,
        user_id: 1,
        learning_path_id: 105,
        assigned_date: '2024-07-05',
        status: 'not_started',
        completion_date: undefined,
        is_mandatory_by_system: false,
        is_registered_by_developer: true,
        learning_path: {
          id: 105,
          name: 'Recommended Path C',
          description: 'Cloud fundamentals for developers.',
          courses: [
            { id: 8, learning_path_id: 105, course_id: 208, sequence_order: 1, course: {} }
          ]
        }
      }
    ];
    this.mandatoryLearningPaths = this.userLearningPaths.filter(lp => lp.is_mandatory_by_system);
    this.recommendedLearningPaths = this.userLearningPaths.filter(lp => !lp.is_mandatory_by_system);
    this.learningPathProgress = {
      101: 60,
      102: 20,
      103: 100,
      104: 45,
      105: 0
    };
  }

  fetchUserAndLearningPaths() {
    this.loading = true;
    this.error = null;
    const userId = this.getCurrentUserId();
    if (!userId) {
      this.error = 'User not found.';
      this.loading = false;
      return;
    }
    this.userService.getUser(userId).subscribe({
      next: (user: UserResponse) => {
        this.user = user;
        this.userLearningPaths = user.user_learning_paths || [];
        this.mandatoryLearningPaths = this.userLearningPaths.filter(lp => lp.is_mandatory_by_system);
        this.recommendedLearningPaths = this.userLearningPaths.filter(lp => !lp.is_mandatory_by_system);
        const courseProgress: UserCourseProgressResponse[] = user.user_course_progress || [];
        this.learningPathProgress = {};
        for (const lp of this.userLearningPaths) {
          const courseIds = lp.learning_path.courses.map((c: UserLearningPathResponse["learning_path"]["courses"][0]) => c.course_id);
          const relevantProgress = courseProgress.filter(cp => courseIds.includes(cp.course_id));
          const avgProgress = relevantProgress.length
            ? Math.round(relevantProgress.reduce((sum, cp) => sum + (cp.progress_percentage || 0), 0) / relevantProgress.length)
            : 0;
          this.learningPathProgress[lp.learning_path_id] = avgProgress;
        }
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Failed to load user data.';
        this.loading = false;
      }
    });
  }

  getCurrentUserId(): number | null {
    // Try to extract user id from token or local storage (customize as needed)
    // For demo, try to get from localStorage
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.id;
      } catch {
        return null;
      }
    }
    return null;
  }
}
