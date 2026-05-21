import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceRequest } from '../models/service-request';

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {

  private apiUrl = 'http://localhost:8081/api/service-requests';

  constructor(private http: HttpClient) {}

  getRequests(): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(this.apiUrl);
  }

  addRequest(request: ServiceRequest): Observable<ServiceRequest> {
    return this.http.post<ServiceRequest>(this.apiUrl, request);
  }
}