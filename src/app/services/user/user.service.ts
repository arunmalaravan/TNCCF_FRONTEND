import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient = inject(HttpClient);

  constructor() { }

  // Create a new user
  createUser(user: any): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/user`, user);
  }

  // Get all users
  getAllUsers(): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/user`);
  }

  // Get user by ID
  getUserById(user_id: number): Observable<any> {
    return this.httpClient.get(`${environment.apiUrl}/user/${user_id}`);
  }

  // Update a user
  updateUser(user: any): Observable<any> {
    return this.httpClient.put(`${environment.apiUrl}/user`, user);
  }

  // Delete a user
  deleteUser(user_id: number): Observable<any> {
    return this.httpClient.delete(`${environment.apiUrl}/user/${user_id}`);
  }
}
