import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div style="display: flex; justify-content: center; align-items: center; min-height: 80vh;">
      <div class="glass-panel animate-scale-in" style="border-radius: 30px; min-height: auto; max-width: 500px; width: 100%; margin-top: 0; padding: 4rem 3rem; text-align: center;">
        <h2 style="margin-bottom: 2rem; font-size: 2.5rem; color: var(--bg-color); font-weight: 800;">Get Started</h2>
        
        <form (ngSubmit)="onRegister()" #registerForm="ngForm">
          <div style="display: flex; gap: 1rem;">
            <div class="form-group" style="flex: 1; text-align: left;">
              <label class="form-label">First Name</label>
              <input type="text" class="form-control" name="firstName" [(ngModel)]="user.firstName" required>
            </div>
            <div class="form-group" style="flex: 1; text-align: left;">
              <label class="form-label">Last Name</label>
              <input type="text" class="form-control" name="lastName" [(ngModel)]="user.lastName" required>
            </div>
          </div>

          <div class="form-group" style="text-align: left;">
            <label class="form-label">Email Address</label>
            <input type="email" class="form-control" name="email" [(ngModel)]="user.email" required>
          </div>
          
          <div class="form-group" style="text-align: left;">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" name="password" [(ngModel)]="user.password" required>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem; padding: 1rem; font-size: 1.1rem; border-radius: 12px; background-color: var(--primary-color); color: white !important;" [disabled]="!registerForm.valid">
            Create Account
          </button>
        </form>
        
        <p style="margin-top: 2.5rem; color: #78716c; font-weight: 500;">
          Already registered? <a routerLink="/login" style="color: var(--primary-color); text-decoration: none; font-weight: 700;">Sign in here</a>
        </p>
      </div>
    </div>
  `
})
export class RegisterComponent {
  user = { firstName: '', lastName: '', email: '', password: '' };
  constructor(private router: Router) {}
  onRegister(): void {
    console.log('Register attempt', this.user);
    this.router.navigate(['/login']);
  }
}
