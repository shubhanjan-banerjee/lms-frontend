import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-learning-paths',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './learning-paths.component.html',
  styleUrls: ['./learning-paths.component.scss']
})
export class LearningPathsComponent { }
