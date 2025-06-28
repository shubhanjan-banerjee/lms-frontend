import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="open" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div class="relative bg-white rounded-xl shadow-lg p-8 w-[400px]">
        <h3 class="text-xl font-bold mb-4">{{ title }}</h3>
        <div *ngIf="summary">
          <div *ngIf="summary.created?.length">
            <div class="font-semibold text-green-700 mb-1">Created:</div>
            <ul class="mb-2 list-disc list-inside">
              <li *ngFor="let item of summary.created">{{ item }}</li>
            </ul>
          </div>
          <div *ngIf="summary.updated?.length">
            <div class="font-semibold text-blue-700 mb-1">Updated:</div>
            <ul class="mb-2 list-disc list-inside">
              <li *ngFor="let item of summary.updated">{{ item }}</li>
            </ul>
          </div>
          <div *ngIf="summary.errors?.length">
            <div class="font-semibold text-red-700 mb-1">Errors:</div>
            <ul class="mb-2 list-disc list-inside">
              <li *ngFor="let err of summary.errors">{{ err }}</li>
            </ul>
          </div>
        </div>
        <div *ngIf="message && !summary">{{ message }}</div>
        <div class="flex justify-end mt-6">
          <button class="px-4 py-2 rounded bg-primary-600 text-white" (click)="close()">OK</button>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MessageDialogComponent {
  @Input() open = false;
  @Input() title = 'Summary';
  @Input() message = '';
  @Input() summary: { created?: string[]; updated?: string[]; errors?: string[] } | null = null;
  close() {
    this.open = false;
  }
}
