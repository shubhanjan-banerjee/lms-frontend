import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, ConfirmationData } from './confirmation.service';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="bg-white rounded-xl shadow-lg p-8 w-96 relative">
        <h3 class="text-xl font-bold mb-4">{{ title || 'Confirm' }}</h3>
        <p class="mb-6">{{ message }}</p>
        <div class="flex justify-end gap-2">
          <button class="px-4 py-2 rounded border" (click)="handle(false)">Cancel</button>
          <button class="px-4 py-2 rounded bg-red-600 text-white" (click)="handle(true)">Yes</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ConfirmationDialogComponent implements OnInit {
  show = false;
  message = '';
  title = '';
  private resolveFn: ((result: boolean) => void) | null = null;

  constructor(private confirmation: ConfirmationService) { }

  ngOnInit() {
    this.confirmation.onConfirm().subscribe(({ message, title, resolve }) => {
      this.message = message;
      this.title = title || 'Confirm';
      this.show = true;
      this.resolveFn = resolve;
    });
  }

  handle(result: boolean) {
    this.show = false;
    if (this.resolveFn) this.resolveFn(result);
  }
}
