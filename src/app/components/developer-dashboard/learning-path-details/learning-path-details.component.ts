import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LearningPathService } from '../../../services/learning-path.service';
import { ToastrService } from '../../toastr/toastr.service';
import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-developer-learning-path-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './learning-path-details.component.html',
  styleUrls: ['./learning-path-details.component.scss']
})
export class DeveloperLearningPathDetailsComponent implements OnInit {
  learningPath: any = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private learningPathService: LearningPathService,
    private toastr: ToastrService,
    private loader: LoaderService
  ) { }

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
    this.router.navigate(['developer/courses', id]);
  }

  registerForLearningPath() {
    if (!this.learningPath?.id) return;
    this.loader.showPageLoader();
    this.learningPathService.registerForLearningPath(this.learningPath.id).subscribe({
      next: () => {
        this.loader.hidePageLoader();
        this.toastr.show('Successfully registered for this learning path!', 'success');
      },
      error: (err) => {
        this.loader.hidePageLoader();
        this.toastr.show('Registration failed. Please try again.', 'error');
      }
    });
  }
}
