import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastMessage {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
}

@Injectable({ providedIn: 'root' })
export class ToastrService {
  private toastSubject = new Subject<ToastMessage>();
  toastState$ = this.toastSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') {
    this.toastSubject.next({ message, type });
  }
}
