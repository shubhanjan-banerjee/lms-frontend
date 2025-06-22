import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMsg = '';
      const { username, password } = this.loginForm.value;
      this.authService.login({ username, password }).subscribe({
        next: (token) => {
          this.isLoading = false;
          this.authService.setToken(token);
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          this.isLoading = false;
          this.errorMsg = 'Login failed. Please check your credentials.';
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
