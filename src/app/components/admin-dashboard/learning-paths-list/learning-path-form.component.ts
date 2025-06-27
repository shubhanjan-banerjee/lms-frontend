import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-learning-path-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()">
      <label>Name</label>
      <input [(ngModel)]="form.name" name="name" required />
      <label>Description</label>
      <textarea [(ngModel)]="form.description" name="description"></textarea>
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
export class LearningPathFormComponent {
  @Input() form: any = { name: '', description: '' };
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  onSubmit() {
    this.save.emit(this.form);
  }
}
