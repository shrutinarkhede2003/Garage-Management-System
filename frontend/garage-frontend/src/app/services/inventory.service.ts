import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InventoryItem {
  id?: number;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  supplier: string;
}

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private apiUrl = 'http://localhost:8081/api/inventory';
  constructor(private http: HttpClient) {}
  getItems(): Observable<InventoryItem[]> { return this.http.get<InventoryItem[]>(this.apiUrl); }
  createItem(item: InventoryItem): Observable<InventoryItem> { return this.http.post<InventoryItem>(this.apiUrl, item); }
  deleteItem(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
