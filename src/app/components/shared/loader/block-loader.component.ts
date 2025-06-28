import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-block-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="loading" class="block-loader-overlay">
      <div class="spinner"></div>
    </div>
  `,
  styles: [`
    .block-loader-overlay {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(255,255,255,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .spinner {
      width: 48px;
      height: 48px;
      border: 6px solid #e0e0e0;
      border-top: 6px solid #1976d2;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class BlockLoaderComponent {
  @Input() loading = false;
}
