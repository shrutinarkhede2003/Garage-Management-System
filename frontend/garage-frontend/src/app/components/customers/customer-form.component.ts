import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customer-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="glass-panel animate-slide-up" style="max-width: 600px; margin: 0 auto;">
      <h2 style="margin-bottom: 1.5rem; color: var(--primary-color);">{{isEditMode ? 'Edit' : 'Add'}} Customer</h2>
      
      <form (ngSubmit)="onSubmit()" #customerForm="ngForm">
        <div style="display: flex; gap: 1rem;">
          <div class="form-group" style="flex: 1;">
            <label class="form-label">First Name</label>
            <input type="text" class="form-control" name="firstName" [(ngModel)]="customer.firstName" required>
          </div>
          
          <div class="form-group" style="flex: 1;">
            <label class="form-label">Last Name</label>
            <input type="text" class="form-control" name="lastName" [(ngModel)]="customer.lastName" required>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" name="email" [(ngModel)]="customer.email" required>
        </div>

        <div class="form-group">
          <label class="form-label">Phone</label>
          <input type="text" class="form-control" name="phone" [(ngModel)]="customer.phone" required>
        </div>

        <div class="form-group">
          <label class="form-label">Address</label>
          <textarea class="form-control" name="address" [(ngModel)]="customer.address" rows="3" required></textarea>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
          <button type="button" class="btn btn-secondary" (click)="cancel()">Cancel</button>
          <button type="submit" class="btn btn-primary" [disabled]="!customerForm.valid">
            {{isEditMode ? 'Update' : 'Save'}} Customer
          </button>
        </div>
      </form>
    </div>
  `
})
export class CustomerFormComponent implements OnInit {
  customer: Customer = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  };
  isEditMode = false;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.customerService.getCustomer(+id).subscribe({
        next: (data) => this.customer = data,
        error: (err) => console.error('Error fetching customer', err)
      });
    }
  }

  onSubmit(): void {
    this.customerService.addCustomer(this.customer).subscribe({
      next: () => {
        this.router.navigate(['/customers']);
      },
      error: (err) => console.error('Error saving customer', err)
    });
  }

  cancel(): void {
    this.router.navigate(['/customers']);
  }
}
