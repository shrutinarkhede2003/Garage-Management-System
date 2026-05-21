import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Mechanic {
  id?: number;
  name: string;
  specialization: string;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class MechanicService {
  private apiUrl = 'http://localhost:8081/api/mechanics';

  constructor(private http: HttpClient) {}

  getMechanics(): Observable<Mechanic[]> {
    return this.http.get<Mechanic[]>(this.apiUrl);
  }

  createMechanic(mechanic: Mechanic): Observable<Mechanic> {
    return this.http.post<Mechanic>(this.apiUrl, mechanic);
  }

  deleteMechanic(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
