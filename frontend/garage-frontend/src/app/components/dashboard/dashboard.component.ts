import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="dashboard-wrapper">
      <div class="dashboard-hero animate-fade-in">
        <div class="hero-content">
          <h1 class="hero-title">GARAGE<br><span>MAGIC</span></h1>
          <p class="hero-subtitle">5 ways to run the most efficient automotive repair shop in the game.</p>
          <div class="hero-actions">
            <a routerLink="/customers" class="hero-btn">
              GET STARTED
              <span class="btn-arrow">→</span>
            </a>
          </div>
        </div>
        <div class="hero-image-wrapper">
          <div class="glow-orb"></div>
          <img src="/assets/images/hero.png" alt="" class="organic-image">
        </div>
      </div>
    </div>
    
    <style>
      .dashboard-wrapper {
        position: relative;
        overflow: hidden;
        padding-bottom: 4rem;
      }
      .dashboard-hero {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 4rem 5%;
        gap: 3rem;
        max-width: 1300px;
        margin: 0 auto;
        min-height: 65vh;
      }
      .hero-content {
        flex: 1;
        max-width: 500px;
        z-index: 2;
      }
      .hero-title {
        font-size: 4rem;
        font-weight: 800;
        line-height: 1.1;
        margin-bottom: 1.5rem;
        letter-spacing: -0.02em;
        text-transform: uppercase;
        position: relative;
      }
      .hero-title span {
        background-color: var(--card-bg);
        color: var(--text-dark);
        padding: 0 0.5rem;
        border-radius: 8px;
        display: inline-block;
        margin-top: 0.5rem;
      }
      .hero-subtitle {
        font-size: 1.25rem;
        font-weight: 400;
        margin-bottom: 2.5rem;
        max-width: 450px;
        line-height: 1.6;
        opacity: 0.95;
      }
      .hero-image-wrapper {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 1;
      }
      .glow-orb {
        position: absolute;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(217, 249, 157, 0.8) 0%, rgba(93, 110, 36, 0) 65%);
        border-radius: 50%;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        filter: blur(50px);
      }
      .organic-image {
        width: 100%;
        max-width: 550px;
        height: auto;
        object-fit: contain;
        mix-blend-mode: multiply;
      }

      .hero-btn {
        display: inline-flex;
        align-items: center;
        gap: 1rem;
        background-color: var(--card-bg);
        color: var(--text-dark);
        padding: 1.2rem 2.5rem;
        border-radius: 50px;
        font-weight: 800;
        font-size: 1.1rem;
        text-decoration: none;
        box-shadow: 0 15px 30px rgba(0,0,0,0.15);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        letter-spacing: 0.05em;
        margin-top: 1rem;
      }
      .hero-btn:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0,0,0,0.25);
        background-color: white;
      }
      .hero-btn .btn-arrow {
        font-size: 1.5rem;
        transition: transform 0.3s ease;
      }
      .hero-btn:hover .btn-arrow {
        transform: translateX(8px);
      }

      @media (max-width: 768px) {
        .dashboard-hero {
          flex-direction: column;
          text-align: center;
          padding: 2rem 5%;
        }
        .hero-title {
          font-size: 3rem;
        }
        .hero-subtitle {
          margin: 0 auto 2rem;
        }
        .organic-image {
          max-width: 400px;
        }
      }
    </style>
  `
})
export class DashboardComponent {}
