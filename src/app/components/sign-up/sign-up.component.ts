import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Create Account</h1>
          <p>Join IHEC Library to start shopping</p>
        </div>

        <form (ngSubmit)="onSubmit()" #signUpForm="ngForm">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              [(ngModel)]="name"
              required
              minlength="2"
              placeholder="John Doe"
              #nameField="ngModel"
            />
            <div class="error" *ngIf="nameField.invalid && nameField.touched">
              Name must be at least 2 characters
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              [(ngModel)]="email"
              required
              email
              placeholder="your@email.com"
              #emailField="ngModel"
            />
            <div class="error" *ngIf="emailField.invalid && emailField.touched">
              Please enter a valid email
            </div>
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              required
              minlength="6"
              placeholder="••••••••"
              #passwordField="ngModel"
            />
            <div class="error" *ngIf="passwordField.invalid && passwordField.touched">
              Password must be at least 6 characters
            </div>
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              [(ngModel)]="confirmPassword"
              required
              placeholder="••••••••"
              #confirmField="ngModel"
            />
            <div class="error" *ngIf="confirmField.touched && password !== confirmPassword">
              Passwords do not match
            </div>
          </div>

          <button 
            type="submit" 
            class="btn-primary"
            [disabled]="signUpForm.invalid || password !== confirmPassword || isLoading"
          >
            <span *ngIf="!isLoading">Create Account</span>
            <span *ngIf="isLoading">Creating account...</span>
          </button>
        </form>

        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/sign-in">Sign In</a></p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  onSubmit(): void {
    if (!this.name || !this.email || !this.password) {
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toastService.error('Passwords do not match!');
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const success = this.authService.signUp(this.email, this.password, this.name);

      if (success) {
        this.toastService.success('Account created successfully! Welcome to IHEC Library 🎉');
        this.router.navigate(['/']);
      } else {
        this.toastService.error('Email already exists. Please use a different email or sign in.');
      }

      this.isLoading = false;
    }, 500);
  }
}
