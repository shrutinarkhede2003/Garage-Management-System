import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 80vh;">
      <div class="glass-panel animate-scale-in" style="border-radius: 30px; min-height: auto; max-width: 450px; width: 100%; margin-top: 0; padding: 4rem 3rem; text-align: center;">
        <h2 style="margin-bottom: 2rem; font-size: 2.5rem; color: var(--bg-color); font-weight: 800;">Welcome Back</h2>
        
        <form (ngSubmit)="onLogin()" #loginForm="ngForm">
          <div class="form-group" style="text-align: left;">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-control" name="email" [(ngModel)]="credentials.email" required placeholder="Enter your email">
          </div>
          
          <div class="form-group" style="text-align: left;">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" name="password" [(ngModel)]="credentials.password" required placeholder="Enter your password">
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem; padding: 1rem; font-size: 1.1rem; border-radius: 12px; background-color: var(--primary-color); color: white !important;" [disabled]="!loginForm.valid">
            Sign In
          </button>
        </form>
        
        <p style="margin-top: 2.5rem; color: #78716c; font-weight: 500;">
          New here? <a routerLink="/register" style="color: var(--primary-color); text-decoration: none; font-weight: 700;">Create an account</a>
        </p>
      </div>
    </div>
  `
})
export class LoginComponent {
  credentials = { email: '', password: '' };
  constructor(private router: Router) {}
  onLogin(): void {
    console.log('Login attempt', this.credentials);
    const username = this.credentials.email.split('@')[0];
    localStorage.setItem('currentUser', username);
    this.router.navigate(['/home']);
  }
}
