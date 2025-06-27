import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-developer-dashboard-overview',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './developer-dashboard-overview.component.html',
  styleUrls: ['./developer-dashboard-overview.component.scss']
})
export class DeveloperDashboardOverviewComponent { }
