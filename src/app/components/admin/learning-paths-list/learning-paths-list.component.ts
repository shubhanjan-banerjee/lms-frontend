import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LearningPathService } from '../../../services/learning-path.service';
import { LearningPathFormComponent } from './learning-path-form.component';

@Component({
  selector: 'app-admin-learning-paths-list',
  standalone: true,
  imports: [CommonModule, FormsModule, LearningPathFormComponent],
  templateUrl: './learning-paths-list.component.html',
  styleUrls: ['./learning-paths-list.component.scss']
})
export class AdminLearningPathsListComponent implements OnInit {
  learningPaths: any[] = [];
  search = '';
  sort = 'name';
  filter = '';
  loading = false;

  showModal = false;
  modalForm: any = { name: '', description: '' };
  isEdit = false;

  constructor(private learningPathService: LearningPathService, private router: Router) { }

  ngOnInit() {
    this.fetchLearningPaths();
  }

  fetchLearningPaths() {
    this.loading = true;
    this.learningPathService.getLearningPaths({ search: this.search, sort: this.sort, filter: this.filter })
      .subscribe({
        next: (res: any) => { this.learningPaths = res.items; this.loading = false; },
        error: () => { this.loading = false; }
      });
  }

  onSearchChange() { this.fetchLearningPaths(); }
  onSortChange() { this.fetchLearningPaths(); }
  onFilterChange() { this.fetchLearningPaths(); }

  viewDetails(id: number) {
    this.router.navigate(['admin/learning-paths', id]);
  }

  openAddDialog() {
    this.isEdit = false;
    this.modalForm = { name: '', description: '' };
    this.showModal = true;
  }

  openEditDialog(lp: any) {
    this.isEdit = true;
    this.modalForm = { ...lp };
    this.showModal = true;
  }

  saveLearningPath(form: any) {
    if (this.isEdit && form.id) {
      this.learningPathService.updateLearningPath(form.id, form).subscribe(() => {
        this.showModal = false;
        this.fetchLearningPaths();
      });
    } else {
      this.learningPathService.createLearningPath(form).subscribe(() => {
        this.showModal = false;
        this.fetchLearningPaths();
      });
    }
  }

  cancelModal() {
    this.showModal = false;
  }

  deleteLearningPath(id: number) {
    if (confirm('Are you sure you want to delete this learning path?')) {
      this.learningPathService.deleteLearningPath(id).subscribe(() => this.fetchLearningPaths());
    }
  }
}
