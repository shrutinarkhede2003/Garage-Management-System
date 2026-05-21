import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Invoice {
  id?: number;
  issueDate: string;
  totalAmount: number;
  taxAmount: number;
}

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  private apiUrl = 'http://localhost:8081/api/invoices';
  constructor(private http: HttpClient) {}
  getInvoices(): Observable<Invoice[]> { return this.http.get<Invoice[]>(this.apiUrl); }
  createInvoice(invoice: Invoice): Observable<Invoice> { return this.http.post<Invoice>(this.apiUrl, invoice); }
  deleteInvoice(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
