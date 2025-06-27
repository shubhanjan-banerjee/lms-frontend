import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export interface ConfirmationData {
  message: string;
  title?: string;
}

@Injectable({ providedIn: 'root' })
export class ConfirmationService {
  private confirmSubject = new Subject<ConfirmationData & { resolve: (result: boolean) => void }>();

  onConfirm(): Observable<ConfirmationData & { resolve: (result: boolean) => void }> {
    return this.confirmSubject.asObservable();
  }

  confirm(message: string, title?: string): Promise<boolean> {
    return new Promise(resolve => {
      this.confirmSubject.next({ message, title, resolve });
    });
  }
}
