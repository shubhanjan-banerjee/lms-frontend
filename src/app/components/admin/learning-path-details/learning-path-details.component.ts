import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LearningPathService } from '../../../services/learning-path.service';

@Component({
  selector: 'app-admin-learning-path-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning-path-details.component.html',
  styleUrls: ['./learning-path-details.component.scss']
})
export class AdminLearningPathDetailsComponent implements OnInit {
  learningPath: any = null;
  loading = false;

  constructor(private route: ActivatedRoute, private router: Router, private learningPathService: LearningPathService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchLearningPath(+id);
    }
  }

  fetchLearningPath(id: number) {
    this.loading = true;
    // Dummy data for demo
    setTimeout(() => {
      this.learningPath = {
        id: id,
        name: 'Frontend Mastery',
        description: 'Angular, TypeScript, and UI/UX best practices.',
        courses: [
          { course: { id: 1, name: 'Angular Basics', description: 'Intro to Angular', provider: 'Udemy', duration_hours: 5 } },
          { course: { id: 2, name: 'TypeScript Advanced', description: 'Deep dive into TS', provider: 'Coursera', duration_hours: 4 } }
        ],
        users: [
          { id: 1, name: 'Alice Johnson', completion: 90 },
          { id: 2, name: 'Bob Williams', completion: 60 },
          { id: 4, name: 'Dana Lee', completion: 40 }
        ]
      };
      this.loading = false;
    }, 500);
    // Uncomment below for real API
    // this.learningPathService.getLearningPath(id).subscribe({
    //   next: (res: any) => { this.learningPath = res; this.loading = false; },
    //   error: () => { this.loading = false; }
    // });
  }

  goToCourse(id: number) {
    this.router.navigate(['admin/courses', id]);
  }
}
