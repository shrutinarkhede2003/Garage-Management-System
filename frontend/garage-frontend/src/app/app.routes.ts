import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CustomerListComponent } from './components/customers/customer-list.component';
import { CustomerFormComponent } from './components/customers/customer-form.component';
import { VehicleListComponent } from './components/vehicles/vehicle-list.component';
import { MechanicListComponent } from './components/mechanics/mechanic-list.component';
import { InvoiceListComponent } from './components/invoices/invoice-list.component';
import { InventoryListComponent } from './components/inventory/inventory-list.component';
import { RepairListComponent } from './components/repairs/repair-list.component';
import { LoginComponent } from './components/auth/login.component';
import { RegisterComponent } from './components/auth/register.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'customers', component: CustomerListComponent },
  { path: 'add-customer', component: CustomerFormComponent },
  { path: 'edit-customer/:id', component: CustomerFormComponent },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'mechanics', component: MechanicListComponent },
  { path: 'invoices', component: InvoiceListComponent },
  { path: 'inventory', component: InventoryListComponent },
  { path: 'repairs', component: RepairListComponent },
  { path: '**', redirectTo: 'login' }
];
