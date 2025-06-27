import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { EmployeeUploadService } from '../../../services/employee-upload.service';
import { ToastrService } from '../../toastr/toastr.service';
import { UserService } from '../../../services/user.service';
import { UserResponse, UserCreate, UserUpdate } from '../../../models/user.model';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ConfirmationService } from '../../confirmation-dialog/confirmation.service';
import { BlockLoaderComponent } from '../../loader/block-loader.component';
import { InlineLoaderComponent } from '../../loader/inline-loader.component';
import { MessageDialogComponent } from '../../message-dialog/message-dialog.component';

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
  imports: [
    CommonModule, MatIconModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatPaginatorModule,
    BlockLoaderComponent, InlineLoaderComponent, MessageDialogComponent
  ],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  showUploadDialog = false;
  selectedFile: File | null = null;
  employees: Employee[] = [];
  techHeaders: string[] = [];

  users: UserResponse[] = [];
  totalUsers = 0;
  pageSize = 10;
  pageIndex = 0;
  isLoading = false;
  showForm = false;
  isEdit = false;
  selectedUser: UserResponse | null = null;
  userForm: FormGroup;
  isBlockLoading = false;
  inlineLoading = false;
  showBulkUploadDialog = false;
  bulkUploadLoading = false;
  messageDialogOpen = false;
  messageDialogSummary: any = null;

  constructor(
    private employeeUploadService: EmployeeUploadService,
    private toastr: ToastrService,
    private userService: UserService,
    private confirmation: ConfirmationService
  ) {
    this.userForm = new FormGroup({
      sso_id: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      first_name: new FormControl('', Validators.required),
      last_name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    });
    this.loadUsers();
  }

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

  openBulkUploadDialog() {
    this.showBulkUploadDialog = true;
    this.selectedFile = null;
  }

  closeBulkUploadDialog() {
    this.showBulkUploadDialog = false;
    this.selectedFile = null;
  }

  closeMessageDialog() {
    this.messageDialogOpen = false;
    this.messageDialogSummary = null;
  }

  uploadFile() {
    if (!this.selectedFile) return;
    this.bulkUploadLoading = true;
    this.employeeUploadService.uploadExcel(this.selectedFile).subscribe({
      next: (res: any) => {
        this.bulkUploadLoading = false;
        this.showBulkUploadDialog = false;
        if (res && res.summary) {
          this.messageDialogSummary = res.summary;
          this.messageDialogOpen = true;
        } else {
          this.toastr.show('Bulk upload successful!', 'success');
        }
        this.loadUsers();
      },
      error: () => {
        this.bulkUploadLoading = false;
        this.toastr.show('File upload failed.', 'error');
      }
    });
  }

  getProficiency(emp: Employee, tech: string): number | string {
    const prof = emp.proficiency.find(p => p.technology === tech);
    return prof ? prof.proficiencyLevel : '-';
  }

  loadUsers(event?: PageEvent) {
    this.isBlockLoading = true;
    const skip = event ? event.pageIndex * event.pageSize : this.pageIndex * this.pageSize;
    const limit = event ? event.pageSize : this.pageSize;
    this.userService.getUsers(skip, limit).subscribe({
      next: (users) => {
        this.users = users;
        this.totalUsers = users.length < limit ? skip + users.length : skip + limit + 1; // crude estimate
        this.isBlockLoading = false;
      },
      error: () => {
        this.toastr.show('Failed to load users', 'error');
        this.isBlockLoading = false;
      }
    });
  }

  openAddForm() {
    this.showForm = true;
    this.isEdit = false;
    this.selectedUser = null;
    this.userForm.reset();
  }

  openEditForm(user: UserResponse) {
    this.showForm = true;
    this.isEdit = true;
    this.selectedUser = user;
    this.userForm.patchValue({
      sso_id: user.sso_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      password: '',
      role: user.role
    });
  }

  closeForm() {
    this.showForm = false;
    this.userForm.reset();
    this.selectedUser = null;
  }

  submitForm() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.inlineLoading = true;
    const formValue = this.userForm.value;
    if (this.isEdit && this.selectedUser) {
      const updateData: UserUpdate = {
        email: formValue.email,
        first_name: formValue.first_name,
        last_name: formValue.last_name,
        role: formValue.role
      };
      this.userService.updateUser(this.selectedUser.id, updateData).subscribe({
        next: () => {
          this.toastr.show('User updated successfully', 'success');
          this.closeForm();
          this.loadUsers();
          this.inlineLoading = false;
        },
        error: () => {
          this.toastr.show('Failed to update user', 'error');
          this.inlineLoading = false;
        }
      });
    } else {
      const createData: UserCreate = {
        sso_id: formValue.sso_id,
        email: formValue.email,
        first_name: formValue.first_name,
        last_name: formValue.last_name,
        password: formValue.password
      };
      this.userService.createUser(createData).subscribe({
        next: () => {
          this.toastr.show('User created successfully', 'success');
          this.closeForm();
          this.loadUsers();
          this.inlineLoading = false;
        },
        error: () => {
          this.toastr.show('Failed to create user', 'error');
          this.inlineLoading = false;
        }
      });
    }
  }

  async deleteUser(user: UserResponse) {
    const confirmed = await this.confirmation.confirm('Are you sure you want to delete this user?', 'Delete User');
    if (confirmed) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.toastr.show('User deleted successfully', 'success');
          this.loadUsers();
        },
        error: () => this.toastr.show('Failed to delete user', 'error')
      });
    }
  }
}
