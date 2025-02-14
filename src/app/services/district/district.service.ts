import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private httpClient = inject(HttpClient);

  constructor() { }

  // Create a new district
  createDistrict(district: any): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/district`, district);
  }

  // Get all districts
  getAllDistricts(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/district`);
  }

  // Get district by ID
  getDistrictById(id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/district/${id}`);
  }
  
  // Update a district
  updateDistrict(district: any): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/district`, district);
  }

  // Delete a district
  deleteDistrict(id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/district/${id}`);
  }
}
