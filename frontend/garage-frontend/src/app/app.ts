import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('garage-frontend');
  showNav = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showNav = !(event.urlAfterRedirects.includes('/login') || event.urlAfterRedirects.includes('/register'));
      }
    });
  }

  get currentUser() {
    return localStorage.getItem('currentUser') || 'Admin';
  }

  get userInitial() {
    return this.currentUser.charAt(0).toUpperCase();
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
