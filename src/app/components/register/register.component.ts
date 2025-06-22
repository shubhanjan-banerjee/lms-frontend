import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    NgIf,
    RouterLink
  ],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrls: []
})
export class RegisterComponent {
  registerForm = new FormGroup({
    sso_id: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required)
  });
  isLoading = false;
  errorMsg = '';

  constructor(private userService: UserService, private router: Router) { }

  onSubmit() {
    if (this.registerForm.valid && this.passwordsMatch()) {
      this.isLoading = true;
      this.errorMsg = '';
      const { sso_id, email, first_name, last_name, password } = this.registerForm.value;
      this.userService.createUser({
        sso_id: sso_id || '',
        email: email || '',
        first_name: first_name || '',
        last_name: last_name || '',
        password: password || ''
      }).subscribe({
        next: () => {
          this.isLoading = false;
          alert('Registration successful! You can now log in.');
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          this.isLoading = false;
          this.errorMsg = 'Registration failed. Please check your details.';
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
      if (!this.passwordsMatch()) {
        this.registerForm.get('confirmPassword')?.setErrors({ mismatch: true });
      }
    }
  }

  passwordsMatch(): boolean {
    return this.registerForm.get('password')?.value === this.registerForm.get('confirmPassword')?.value;
  }
}
