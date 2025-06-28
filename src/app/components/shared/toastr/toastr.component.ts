import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService, ToastMessage } from './toastr.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-toastr',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="show" class="toastr" [ngClass]="type">
      {{ message }}
    </div>
  `,
  styles: [`
    .toastr {
      position: fixed;
      top: 30px;
      right: 30px;
      min-width: 200px;
      padding: 16px 24px;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
      z-index: 9999;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      opacity: 0.95;
      transition: opacity 0.3s;
    }
    .success { background: #43a047; }
    .error { background: #e53935; }
    .info { background: #1e88e5; }
    .warning { background: #fbc02d; color: #222; }
  `]
})
export class ToastrComponent implements OnDestroy {
  message = '';
  type: 'success' | 'error' | 'info' | 'warning' = 'info';
  show = false;
  private sub: Subscription;
  private timerSub?: Subscription;

  constructor(private toastr: ToastrService) {
    this.sub = this.toastr.toastState$.subscribe((toast: ToastMessage) => {
      this.message = toast.message;
      this.type = toast.type || 'info';
      this.show = true;
      if (this.timerSub) this.timerSub.unsubscribe();
      this.timerSub = timer(3000).subscribe(() => this.show = false);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    if (this.timerSub) this.timerSub.unsubscribe();
  }
}
