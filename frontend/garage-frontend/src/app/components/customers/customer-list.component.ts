import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="glass-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h2>👥 Customers</h2>
        <button class="btn btn-primary" *ngIf="!showForm" (click)="openForm()">Add Customer</button>
      </div>

      <div *ngIf="showForm" style="margin-bottom: 2rem; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h3 style="margin-bottom: 1rem;">{{ currentCustomer.id ? 'Edit' : 'Add' }} Customer</h3>
        <form (ngSubmit)="saveCustomer()" #form="ngForm">
          <div style="display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
            <input type="text" class="form-control" name="firstName" [(ngModel)]="currentCustomer.firstName" placeholder="First Name" required style="flex: 1; min-width: 150px;">
            <input type="text" class="form-control" name="lastName" [(ngModel)]="currentCustomer.lastName" placeholder="Last Name" required style="flex: 1; min-width: 150px;">
            <input type="email" class="form-control" name="email" [(ngModel)]="currentCustomer.email" placeholder="Email" required style="flex: 1; min-width: 200px;">
            <input type="text" class="form-control" name="phone" [(ngModel)]="currentCustomer.phone" placeholder="Phone" required style="flex: 1; min-width: 150px;">
            <input type="text" class="form-control" name="address" [(ngModel)]="currentCustomer.address" placeholder="Address" required style="flex: 2; min-width: 200px;">
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
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th style="text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let customer of customers">
            <td>{{ customer.firstName }} {{ customer.lastName }}</td>
            <td>{{ customer.email }}</td>
            <td>{{ customer.phone }}</td>
            <td>{{ customer.address }}</td>
            <td style="text-align: right;">
              <button class="btn btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; margin-right: 0.5rem;" (click)="editCustomer(customer)">Edit</button>
              <button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" (click)="deleteCustomer(customer.id!)">Delete</button>
            </td>
          </tr>
          <tr *ngIf="customers.length === 0">
            <td colspan="5" style="text-align: center; padding: 2rem; opacity: 0.7;">No customers found. Add one to get started!</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];
  showForm = false;
  currentCustomer: Customer = { firstName: '', lastName: '', email: '', phone: '', address: '' };

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe({
      next: (data) => this.customers = data,
      error: (err) => console.error('Error loading customers', err)
    });
  }

  openForm(): void {
    this.currentCustomer = { firstName: '', lastName: '', email: '', phone: '', address: '' };
    this.showForm = true;
  }

  editCustomer(customer: Customer): void {
    this.currentCustomer = { ...customer };
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
  }

  saveCustomer(): void {
    this.customerService.addCustomer(this.currentCustomer).subscribe({
      next: () => {
        this.loadCustomers();
        this.showForm = false;
      },
      error: (err) => console.error('Error saving customer', err)
    });
  }

  deleteCustomer(id: number): void {
    if (confirm('Are you sure you want to delete this customer?')) {
      this.customerService.deleteCustomer(id).subscribe({
        next: () => this.loadCustomers(),
        error: (err) => console.error('Error deleting customer', err)
      });
    }
  }
}
