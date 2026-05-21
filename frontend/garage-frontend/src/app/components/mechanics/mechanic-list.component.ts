import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MechanicService, Mechanic } from '../../services/mechanic.service';

@Component({
  selector: 'app-mechanic-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="glass-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h2>👨‍🔧 Mechanics</h2>
        <button class="btn btn-primary" *ngIf="!showForm" (click)="openForm()">Add Mechanic</button>
      </div>

      <div *ngIf="showForm" style="margin-bottom: 2rem; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h3 style="margin-bottom: 1rem;">{{ currentMechanic.id ? 'Edit' : 'Add' }} Mechanic</h3>
        <form (ngSubmit)="saveMechanic()" #form="ngForm">
          <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
            <input type="text" class="form-control" name="name" [(ngModel)]="currentMechanic.name" placeholder="Full Name" required>
            <input type="text" class="form-control" name="specialization" [(ngModel)]="currentMechanic.specialization" placeholder="Specialization" required>
            <input type="text" class="form-control" name="phone" [(ngModel)]="currentMechanic.phone" placeholder="Phone" required>
          </div>
          <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button type="button" class="btn btn-secondary" style="background-color: #94a3b8; color: white;" (click)="cancelForm()">Cancel</button>
            <button type="submit" class="btn btn-primary" [disabled]="!form.valid || isSaving">{{ isSaving ? 'Saving...' : 'Save' }}</button>
          </div>
        </form>
      </div>

      <table *ngIf="!showForm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialty</th>
            <th>Phone</th>
            <th style="text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let mechanic of mechanics">
            <td>#{{ mechanic.id }}</td>
            <td>{{ mechanic.name }}</td>
            <td>{{ mechanic.specialization }}</td>
            <td>{{ mechanic.phone }}</td>
            <td style="text-align: right;">
              <button class="btn btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; margin-right: 0.5rem;" (click)="editMechanic(mechanic)">Edit</button>
              <button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" (click)="deleteMechanic(mechanic.id!)">Delete</button>
            </td>
          </tr>
          <tr *ngIf="mechanics.length === 0">
            <td colspan="5" style="text-align: center; padding: 2rem; opacity: 0.7;">No mechanics found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class MechanicListComponent implements OnInit {
  mechanics: Mechanic[] = [];
  showForm = false;
  currentMechanic: Mechanic = { name: '', specialization: '', phone: '' };

  isSaving = false;

  constructor(private mechanicService: MechanicService) {}

  ngOnInit(): void {
    this.loadMechanics();
  }

  loadMechanics(): void {
    this.mechanicService.getMechanics().subscribe(data => this.mechanics = data);
  }

  openForm(): void {
    this.currentMechanic = { name: '', specialization: '', phone: '' };
    this.showForm = true;
  }

  editMechanic(mechanic: Mechanic): void {
    this.currentMechanic = { ...mechanic };
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
  }

  saveMechanic(): void {
    this.isSaving = true;
    this.mechanicService.createMechanic(this.currentMechanic).subscribe({
      next: () => {
        this.loadMechanics();
        this.showForm = false;
        this.isSaving = false;
      },
      error: () => {
        this.isSaving = false;
      }
    });
  }

  deleteMechanic(id: number): void {
    if (confirm('Are you sure?')) {
      this.mechanicService.deleteMechanic(id).subscribe(() => this.loadMechanics());
    }
  }
}
