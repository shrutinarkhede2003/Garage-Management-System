import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceRequest {
  id?: number;
  description: string;
  status: string;
  estimatedCost: number;
  requestDate: string;
}

@Injectable({ providedIn: 'root' })
export class RepairService {
  private apiUrl = 'http://localhost:8081/api/service-requests';
  constructor(private http: HttpClient) {}
  getRequests(): Observable<ServiceRequest[]> { return this.http.get<ServiceRequest[]>(this.apiUrl); }
  createRequest(request: ServiceRequest): Observable<ServiceRequest> { return this.http.post<ServiceRequest>(this.apiUrl, request); }
  deleteRequest(id: number): Observable<void> { return this.http.delete<void>(`${this.apiUrl}/${id}`); }
}
