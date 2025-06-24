import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeUploadService } from '../../../services/employee-upload.service';

interface Proficiency {
  technology: string;
  proficiencyLevel: number;
}

interface Employee {
  associateId: number;
  associateName: string;
  projectRole: string;
  skillRequirement: string;
  proficiency: Proficiency[];
}

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, FormsModule, HttpClientModule],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  showUploadDialog = false;
  selectedFile: File | null = null;
  employees: Employee[] = [];
  techHeaders: string[] = [];

  constructor(private employeeUploadService: EmployeeUploadService) { }

  openUploadDialog() {
    this.showUploadDialog = true;
  }

  closeUploadDialog() {
    this.showUploadDialog = false;
    this.selectedFile = null;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile() {
    if (!this.selectedFile) return;
    this.employeeUploadService.uploadExcel(this.selectedFile).subscribe({
      next: (res: Employee[]) => {
        this.employees = res;
        // Collect all unique technologies for dynamic headers
        const techSet = new Set<string>();
        this.employees.forEach(emp => emp.proficiency.forEach(p => techSet.add(p.technology)));
        this.techHeaders = Array.from(techSet);
        this.showUploadDialog = false;
        this.selectedFile = null;
      },
      error: () => {
        alert('File upload failed.');
      }
    });
  }

  getProficiency(emp: Employee, tech: string): number | string {
    const prof = emp.proficiency.find(p => p.technology === tech);
    return prof ? prof.proficiencyLevel : '-';
  }
}
