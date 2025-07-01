import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from '../../../services/course.service';
import { CourseFormComponent } from './course-form.component';

@Component({
  selector: 'app-admin-courses-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseFormComponent],
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class AdminCoursesListComponent implements OnInit {
  courses: any[] = [];
  search = '';
  sort = 'name';
  filter = '';
  loading = false;

  showModal = false;
  modalForm: any = { name: '', description: '', provider: '', duration_hours: null, image_url: '' };
  isEdit = false;

  constructor(private courseService: CourseService, private router: Router) { }

  ngOnInit() {
    this.fetchCourses();
  }

  fetchCourses() {
    this.loading = true;
    this.courseService.getCourses({ search: this.search, sort: this.sort, filter: this.filter })
      .subscribe({
        next: (res: any) => { this.courses = res.items; this.loading = false; },
        error: () => { this.loading = false; }
      });
  }

  onSearchChange() { this.fetchCourses(); }
  onSortChange() { this.fetchCourses(); }
  onFilterChange() { this.fetchCourses(); }

  viewDetails(id: number) {
    this.router.navigate(['admin/courses', id]);
  }

  openAddDialog() {
    this.isEdit = false;
    this.modalForm = { name: '', description: '', provider: '', duration_hours: null, image_url: '' };
    this.showModal = true;
  }

  openEditDialog(course: any) {
    this.isEdit = true;
    this.modalForm = { ...course };
    this.showModal = true;
  }

  saveCourse(form: any) {
    if (this.isEdit && form.id) {
      this.courseService.updateCourse(form.id, form).subscribe(() => {
        this.showModal = false;
        this.fetchCourses();
      });
    } else {
      this.courseService.createCourse(form).subscribe(() => {
        this.showModal = false;
        this.fetchCourses();
      });
    }
  }

  cancelModal() {
    this.showModal = false;
  }

  deleteCourse(id: number) {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe(() => this.fetchCourses());
    }
  }
}
