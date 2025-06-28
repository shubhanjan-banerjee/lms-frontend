import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-developer-courses-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class DeveloperCoursesListComponent implements OnInit {
  courses: any[] = [];
  search = '';
  sort = 'name';
  filter = '';
  loading = false;

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    this.loading = true;
    this.courseService.getCourses({ search: this.search, sort: this.sort, filter: this.filter })
      .subscribe({
        next: (res: any) => { this.courses = res; this.loading = false; },
        error: () => { this.loading = false; }
      });
  }

  onSearchChange() { this.fetchCourses(); }
  onSortChange() { this.fetchCourses(); }
  onFilterChange() { this.fetchCourses(); }

  viewDetails(id: number) {
    this.router.navigate(['developer/courses', id]);
  }
}
