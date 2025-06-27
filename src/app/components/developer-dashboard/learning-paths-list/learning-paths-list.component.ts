import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LearningPathService } from '../../../services/learning-path.service';

@Component({
  selector: 'app-developer-learning-paths-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './learning-paths-list.component.html',
  styleUrls: ['./learning-paths-list.component.scss']
})
export class DeveloperLearningPathsListComponent implements OnInit {
  learningPaths: any[] = [];
  search = '';
  sort = 'name';
  filter = '';
  loading = false;

  constructor(private learningPathService: LearningPathService, private router: Router) { }

  ngOnInit() {
    this.fetchLearningPaths();
  }

  fetchLearningPaths() {
    this.loading = true;
    this.learningPathService.getLearningPaths({ search: this.search, sort: this.sort, filter: this.filter })
      .subscribe({
        next: (res: any) => { this.learningPaths = res; this.loading = false; },
        error: () => { this.loading = false; }
      });
  }

  onSearchChange() { this.fetchLearningPaths(); }
  onSortChange() { this.fetchLearningPaths(); }
  onFilterChange() { this.fetchLearningPaths(); }

  viewDetails(id: number) {
    this.router.navigate(['developer/learning-paths', id]);
  }
}
