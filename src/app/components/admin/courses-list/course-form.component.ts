import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-course-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <label>Name</label>
      <input [(ngModel)]="form.name" name="name" required />
      <label>Description</label>
      <textarea [(ngModel)]="form.description" name="description"></textarea>
      <label>Provider</label>
      <input [(ngModel)]="form.provider" name="provider" />
      <label>Duration (hours)</label>
      <input type="number" [(ngModel)]="form.duration_hours" name="duration_hours" />
      <label>Image URL</label>
      <input [(ngModel)]="form.image_url" name="image_url" />
      <div class="actions">
        <button type="submit">{{ form.id ? 'Update' : 'Create' }}</button>
        <button type="button" (click)="cancel.emit()">Cancel</button>
      </div>
    </form>
  `,
  styles: [`
    form { display: flex; flex-direction: column; gap: 1rem; }
    .actions { display: flex; gap: 1rem; }
  `]
})
export class CourseFormComponent {
  @Input() form: any = { name: '', description: '', provider: '', duration_hours: null, image_url: '' };
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.save.emit(this.form);
  }
}
