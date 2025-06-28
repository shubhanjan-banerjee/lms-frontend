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
    this.learningPathService.getLearningPath(id).subscribe({
      next: (res: any) => { this.learningPath = res; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  goToCourse(id: number) {
    this.router.navigate(['admin/courses', id]);
  }
}
