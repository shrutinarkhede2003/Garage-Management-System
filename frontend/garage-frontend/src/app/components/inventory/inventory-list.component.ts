import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InventoryService, InventoryItem } from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="glass-panel">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
        <h2>📦 Inventory</h2>
        <button class="btn btn-primary" *ngIf="!showForm" (click)="openForm()">Add Item</button>
      </div>

      <div *ngIf="showForm" style="margin-bottom: 2rem; padding: 1.5rem; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <h3 style="margin-bottom: 1rem;">{{ currentItem.id ? 'Edit' : 'Add' }} Item</h3>
        <form (ngSubmit)="saveItem()" #form="ngForm">
          <div style="display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
            <input type="text" class="form-control" name="name" [(ngModel)]="currentItem.name" placeholder="Name" required style="flex: 1; min-width: 200px;">
            <input type="text" class="form-control" name="category" [(ngModel)]="currentItem.category" placeholder="Category" required style="flex: 1; min-width: 200px;">
            <input type="number" class="form-control" name="quantity" [(ngModel)]="currentItem.quantity" placeholder="Qty" required style="flex: 1; min-width: 100px;">
            <input type="number" class="form-control" name="unitPrice" [(ngModel)]="currentItem.unitPrice" placeholder="Unit Price" required style="flex: 1; min-width: 100px;">
            <input type="text" class="form-control" name="supplier" [(ngModel)]="currentItem.supplier" placeholder="Supplier" required style="flex: 1; min-width: 200px;">
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
            <th>Category</th>
            <th>Qty</th>
            <th>Unit Price</th>
            <th>Supplier</th>
            <th style="text-align: right;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let item of items">
            <td>{{ item.name }}</td>
            <td>{{ item.category }}</td>
            <td>{{ item.quantity }}</td>
            <td>\${{ item.unitPrice }}</td>
            <td>{{ item.supplier }}</td>
            <td style="text-align: right;">
              <button class="btn btn-primary" style="padding: 0.3rem 0.6rem; font-size: 0.8rem; margin-right: 0.5rem;" (click)="editItem(item)">Edit</button>
              <button class="btn btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" (click)="deleteItem(item.id!)">Delete</button>
            </td>
          </tr>
          <tr *ngIf="items.length === 0">
            <td colspan="6" style="text-align: center; padding: 2rem; opacity: 0.7;">No inventory items found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class InventoryListComponent implements OnInit {
  items: InventoryItem[] = [];
  showForm = false;
  currentItem: InventoryItem = { name: '', category: '', quantity: 0, unitPrice: 0, supplier: '' };

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.inventoryService.getItems().subscribe(data => this.items = data);
  }

  openForm(): void {
    this.currentItem = { name: '', category: '', quantity: 0, unitPrice: 0, supplier: '' };
    this.showForm = true;
  }

  editItem(item: InventoryItem): void {
    this.currentItem = { ...item };
    this.showForm = true;
  }

  cancelForm(): void {
    this.showForm = false;
  }

  saveItem(): void {
    this.inventoryService.createItem(this.currentItem).subscribe(() => {
      this.loadItems();
      this.showForm = false;
    });
  }

  deleteItem(id: number): void {
    if (confirm('Are you sure?')) {
      this.inventoryService.deleteItem(id).subscribe(() => this.loadItems());
    }
  }
}
