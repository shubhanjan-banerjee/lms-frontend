import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-admin-course-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class AdminCourseDetailsComponent implements OnInit {
  course: any = null;
  loading = false;

  constructor(private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchCourse(+id);
    }
  }

  fetchCourse(id: number) {
    this.loading = true;
    this.courseService.getCourse(id).subscribe({
      next: (res: any) => { this.course = res; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
