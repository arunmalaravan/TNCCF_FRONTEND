import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompanyDistrictMappingService {
  private httpClient = inject(HttpClient);

  constructor() { }

  // Get all company-district-mapping mappings
  getAllCompanyDistrictMappings(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/company-district-mapping`);
  }

  // Create a new company-district-mapping mapping
  createCompanyDistrictMapping(mappingData: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/company-district-mapping`, mappingData);
  }

  // Delete a company-district-mapping mapping by company ID and district ID
  deleteCompanyDistrictMapping(params: any): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/company-district-mapping`, { params: params });
  }
}
