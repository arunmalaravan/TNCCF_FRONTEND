import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private httpClient = inject(HttpClient);

  constructor() { }

  getAllCompanies(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/company`);
  }

  createCompany(companyData: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/company`, companyData);
  }

  updateCompany(companyData: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/company`, companyData);
  }

  deleteCompany(companyId: any): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/company/${companyId}`);
  }

  getCompanyById(companyId: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/company/${companyId}`);
  }

  getFilteredCompanyDistricts(params: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/company/filter/companies-districts`, {
      params:params
    });
  }
}
