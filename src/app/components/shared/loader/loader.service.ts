import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private pageLoadingSubject = new BehaviorSubject<boolean>(false);
  pageLoading$ = this.pageLoadingSubject.asObservable();

  showPageLoader() {
    this.pageLoadingSubject.next(true);
  }
  hidePageLoader() {
    this.pageLoadingSubject.next(false);
  }
}
