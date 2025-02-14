import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AmountService {
  private httpClient = inject(HttpClient);

  constructor() { }

  // Get all amounts
  getAllAmounts(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/amount`);
  }

  // Create a new amount
  createAmount(amountData: any): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/amount`, amountData);
  }

  // Update an existing amount
  updateAmount(amountData: any): Observable<any> {
    return this.httpClient.put<any>(`${environment.apiUrl}/amount`, amountData);
  }

  // Delete an amount by ID
  deleteAmount(amountId: any): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/amount/${amountId}`);
  }

  // Get an amount by ID
  getAmountById(amountId: any): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/amount/${amountId}`);
  }
}
