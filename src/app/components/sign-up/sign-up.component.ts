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
  styles: [`
    .auth-container {
      min-height: calc(100vh - 200px);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    .auth-card {
      background: white;
      border-radius: 16px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
      padding: 40px;
      width: 100%;
      max-width: 450px;
      animation: slideIn 0.4s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .auth-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .auth-header h1 {
      font-size: 2rem;
      color: #151f57;
      margin: 0 0 10px 0;
      font-weight: 700;
    }

    .auth-header p {
      color: #666;
      margin: 0;
      font-size: 1rem;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 8px;
      color: #333;
      font-weight: 600;
      font-size: 0.95rem;
    }

    input {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    input:focus {
      outline: none;
      border-color: #151f57;
      box-shadow: 0 0 0 3px rgba(21, 31, 87, 0.1);
    }

    input.ng-invalid.ng-touched {
      border-color: #ff6b6b;
    }

    .error {
      color: #ff6b6b;
      font-size: 0.85rem;
      margin-top: 6px;
    }

    .btn-primary {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #151f57 0%, #0f1438 100%);
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-top: 10px;
    }

    .btn-primary:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(21, 31, 87, 0.3);
    }

    .btn-primary:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .auth-footer {
      text-align: center;
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #e0e0e0;
    }

    .auth-footer p {
      color: #666;
      margin: 0;
    }

    .auth-footer a {
      color: #151f57;
      font-weight: 600;
      text-decoration: none;
      transition: color 0.3s ease;
    }

    .auth-footer a:hover {
      color: #0f1438;
      text-decoration: underline;
    }

    @media (max-width: 768px) {
      .auth-card {
        padding: 30px 20px;
      }

      .auth-header h1 {
        font-size: 1.6rem;
      }

      .form-group {
        margin-bottom: 18px;
      }
    }
  `]
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
