import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-page-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading" class="page-loader-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styles: [`
    .page-loader-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(255,255,255,0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }
    .spinner {
      width: 64px;
      height: 64px;
      border: 8px solid #e0e0e0;
      border-top: 8px solid #1976d2;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class PageLoaderComponent implements OnInit {
  loading = false;
  constructor(private loader: LoaderService) { }
  ngOnInit() {
    this.loader.pageLoading$.subscribe(val => this.loading = val);
  }
}
