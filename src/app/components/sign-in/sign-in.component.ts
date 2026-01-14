import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>Welcome Back!</h1>
          <p>Sign in to access your cart and wishlist</p>
        </div>

        <form (ngSubmit)="onSubmit()" #signInForm="ngForm">
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

          <button 
            type="submit" 
            class="btn-primary"
            [disabled]="signInForm.invalid || isLoading"
          >
            <span *ngIf="!isLoading">Sign In</span>
            <span *ngIf="isLoading">Signing in...</span>
          </button>
        </form>

        <div class="auth-footer">
          <p>Don't have an account? <a routerLink="/sign-up">Sign Up</a></p>
        </div>
      </div>
    </div>
  `,
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      return;
    }

    this.isLoading = true;

    setTimeout(() => {
      const success = this.authService.signIn(this.email, this.password);

      if (success) {
        this.toastService.success('Welcome back! Signed in successfully 🎉');
        this.router.navigate(['/']);
      } else {
        this.toastService.error('Invalid email or password. Please try again.');
      }

      this.isLoading = false;
    }, 500);
  }
}
