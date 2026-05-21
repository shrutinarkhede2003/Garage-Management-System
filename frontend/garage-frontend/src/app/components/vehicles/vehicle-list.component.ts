import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService, Vehicle } from '../../services/vehicle.service';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="glass-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h2>🚗 Vehicles</h2>
        <button class="btn btn-primary" *ngIf="!showForm" (click)="openForm()">Add Vehicle</button>
      </div>

      <div *ngIf="showForm" style="margin-bottom: 2rem; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h3 style="margin-bottom: 1rem;">{{ currentVehicle.id ? 'Edit' : 'Add' }} Vehicle</h3>
        <form (ngSubmit)="saveVehicle()" #form="ngForm">
          <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
            <input type="text" class="form-control" name="make" [(ngModel)]="currentVehicle.make" placeholder="Make" required>
            <input type="text" class="form-control" name="model" [(ngModel)]="currentVehicle.model" placeholder="Model" required>
            <input type="number" class="form-control" name="year" [(ngModel)]="currentVehicle.year" placeholder="Year" required>
            <input type="text" class="form-control" name="licensePlate" [(ngModel)]="currentVehicle.licensePlate" placeholder="License Plate" required>
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
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>License Plate</th>
            <th style="text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let vehicle of vehicles">
            <td>#{{ vehicle.id }}</td>
            <td>{{ vehicle.make }}</td>
            <td>{{ vehicle.model }}</td>
            <td>{{ vehicle.year }}</td>
            <td>{{ vehicle.licensePlate }}</td>
            <td style="text-align: right;">
              <button class="btn btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; margin-right: 0.5rem;" (click)="editVehicle(vehicle)">Edit</button>
              <button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" (click)="deleteVehicle(vehicle.id!)">Delete</button>
            </td>
          </tr>
          <tr *ngIf="vehicles.length === 0">
            <td colspan="6" style="text-align: center; padding: 2rem; opacity: 0.7;">No vehicles found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class VehicleListComponent implements OnInit {
  vehicles: Vehicle[] = [];
  showForm = false;
  currentVehicle: Vehicle = { make: '', model: '', year: 2023, licensePlate: '' };

  isSaving = false;

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    console.log('Vehicle component loaded!');
    this.loadVehicles();
  }

  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe(data => this.vehicles = data);
  }

  openForm(): void {
    this.currentVehicle = { make: '', model: '', year: 2023, licensePlate: '' };
    this.showForm = true;
  }

  editVehicle(vehicle: Vehicle): void {
    this.currentVehicle = { ...vehicle };
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
  }

  saveVehicle(): void {
    this.isSaving = true;
    this.vehicleService.createVehicle(this.currentVehicle).subscribe({
      next: () => {
        this.loadVehicles();
        this.showForm = false;
        this.isSaving = false;
      },
      error: (err) => {
        alert('Failed to save vehicle: ' + err.message);
        this.isSaving = false;
      }
    });
  }

  deleteVehicle(id: number): void {
    if (confirm('Are you sure?')) {
      this.vehicleService.deleteVehicle(id).subscribe({
        next: () => this.loadVehicles(),
        error: (err) => alert('Failed to delete vehicle: ' + err.message)
      });
    }
  }
}
