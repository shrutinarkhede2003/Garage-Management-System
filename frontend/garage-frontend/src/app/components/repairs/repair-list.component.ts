import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RepairService, ServiceRequest } from '../../services/repair.service';

@Component({
  selector: 'app-repair-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="glass-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h2>🔧 Repairs</h2>
        <button class="btn btn-primary" *ngIf="!showForm" (click)="openForm()">New Request</button>
      </div>

      <div *ngIf="showForm" style="margin-bottom: 2rem; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h3 style="margin-bottom: 1rem;">{{ currentRequest.id ? 'Edit' : 'New' }} Request</h3>
        <form (ngSubmit)="saveRequest()" #form="ngForm">
          <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
            <input type="text" class="form-control" name="description" [(ngModel)]="currentRequest.description" placeholder="Description of repair" style="flex: 2;" required>
            <input type="text" class="form-control" name="requestDate" [(ngModel)]="currentRequest.requestDate" placeholder="Date (e.g. 2023-10-01)" style="flex: 1;" required>
            <input type="number" class="form-control" name="estimatedCost" [(ngModel)]="currentRequest.estimatedCost" placeholder="Est. Cost" style="flex: 1;" required>
            <select class="form-control" name="status" [(ngModel)]="currentRequest.status" style="flex: 1;" required>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div style="display: flex; gap: 1rem; justify-content: flex-end;">
            <button type="button" class="btn btn-secondary" style="background-color: #94a3b8; color: white;" (click)="cancelForm()">Cancel</button>
            <button type="submit" class="btn btn-primary" [disabled]="!form.valid">Save</button>
          </div>
        </form>
      </div>

      <table *ngIf="!showForm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Date</th>
            <th>Est. Cost</th>
            <th>Status</th>
            <th style="text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let req of requests">
            <td>#{{ req.id }}</td>
            <td>{{ req.description }}</td>
            <td>{{ req.requestDate | date }}</td>
            <td style="font-weight: 600;">\${{ req.estimatedCost }}</td>
            <td>
              <span style="padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; background: #e2e8f0;">{{ req.status }}</span>
            </td>
            <td style="text-align: right;">
              <button class="btn btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; margin-right: 0.5rem;" (click)="editRequest(req)">Edit</button>
              <button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" (click)="deleteRequest(req.id!)">Delete</button>
            </td>
          </tr>
          <tr *ngIf="requests.length === 0">
            <td colspan="6" style="text-align: center; padding: 2rem; opacity: 0.7;">No repair requests found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class RepairListComponent implements OnInit {
  requests: ServiceRequest[] = [];
  showForm = false;
  currentRequest: ServiceRequest = { description: '', requestDate: '', estimatedCost: 0, status: 'Pending' };

  constructor(private repairService: RepairService) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.repairService.getRequests().subscribe(data => this.requests = data);
  }

  openForm(): void {
    this.currentRequest = { description: '', requestDate: new Date().toISOString().split('T')[0], estimatedCost: 0, status: 'Pending' };
    this.showForm = true;
  }

  editRequest(req: ServiceRequest): void {
    this.currentRequest = { ...req };
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
  }

  saveRequest(): void {
    this.repairService.createRequest(this.currentRequest).subscribe(() => {
      this.loadRequests();
      this.showForm = false;
    });
  }

  deleteRequest(id: number): void {
    if (confirm('Are you sure?')) {
      this.repairService.deleteRequest(id).subscribe(() => this.loadRequests());
    }
  }
}
