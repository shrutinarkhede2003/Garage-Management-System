import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InvoiceService, Invoice } from '../../services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="glass-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h2>🧾 Invoices</h2>
        <button class="btn btn-primary" *ngIf="!showForm" (click)="openForm()">Create Invoice</button>
      </div>

      <div *ngIf="showForm" style="margin-bottom: 2rem; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h3 style="margin-bottom: 1rem;">{{ currentInvoice.id ? 'Edit' : 'Create' }} Invoice</h3>
        <form (ngSubmit)="saveInvoice()" #form="ngForm">
          <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
            <input type="text" class="form-control" name="issueDate" [(ngModel)]="currentInvoice.issueDate" placeholder="Issue Date (e.g. 2023-10-01)" required>
            <input type="number" class="form-control" name="totalAmount" [(ngModel)]="currentInvoice.totalAmount" placeholder="Total Amount" required>
            <input type="number" class="form-control" name="taxAmount" [(ngModel)]="currentInvoice.taxAmount" placeholder="Tax Amount" required>
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
            <th>Issue Date</th>
            <th>Total Amount</th>
            <th>Tax Amount</th>
            <th style="text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let invoice of invoices">
            <td>#{{ invoice.id }}</td>
            <td>{{ invoice.issueDate | date }}</td>
            <td style="font-weight: 600;">\${{ invoice.totalAmount }}</td>
            <td style="font-weight: 600;">\${{ invoice.taxAmount }}</td>
            <td style="text-align: right;">
              <button class="btn btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; margin-right: 0.5rem;" (click)="editInvoice(invoice)">Edit</button>
              <button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" (click)="deleteInvoice(invoice.id!)">Delete</button>
            </td>
          </tr>
          <tr *ngIf="invoices.length === 0">
            <td colspan="5" style="text-align: center; padding: 2rem; opacity: 0.7;">No invoices found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  showForm = false;
  currentInvoice: Invoice = { issueDate: '', totalAmount: 0, taxAmount: 0 };

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoiceService.getInvoices().subscribe(data => this.invoices = data);
  }

  openForm(): void {
    this.currentInvoice = { issueDate: new Date().toISOString().split('T')[0], totalAmount: 0, taxAmount: 0 };
    this.showForm = true;
  }

  editInvoice(invoice: Invoice): void {
    this.currentInvoice = { ...invoice };
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
  }

  saveInvoice(): void {
    this.invoiceService.createInvoice(this.currentInvoice).subscribe(() => {
      this.loadInvoices();
      this.showForm = false;
    });
  }

  deleteInvoice(id: number): void {
    if (confirm('Are you sure?')) {
      this.invoiceService.deleteInvoice(id).subscribe(() => this.loadInvoices());
    }
  }
}
