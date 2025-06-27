import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inline-loader',
  standalone: true,
  imports: [CommonModule],
  template: `<span *ngIf="loading" class="inline-spinner"></span>`,
  styles: [`
    .inline-spinner {
      display: inline-block;
      width: 18px;
      height: 18px;
      border: 3px solid #e0e0e0;
      border-top: 3px solid #1976d2;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
      vertical-align: middle;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class InlineLoaderComponent {
  @Input() loading = false;
}
