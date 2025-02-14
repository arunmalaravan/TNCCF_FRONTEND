import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchemeService {
  private httpClient = inject(HttpClient);

  constructor() { }

  getAllSchemes(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/scheme`);
  }

  createScheme(schemeData: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/scheme`, schemeData);
  }

  updateScheme(schemeData: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/scheme`, schemeData);
  }

  deleteScheme(schemeId: any): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/scheme/${schemeId}`);
  }

  getSchemeById(schemeId: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/scheme/${schemeId}`);
  }
}
