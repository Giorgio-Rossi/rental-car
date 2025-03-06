import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interface/user.model.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';
  private apiUrlSaveUser = 'http://localhost:8080/admin/edit-user';

  http = inject(HttpClient)

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrlSaveUser}/${user.id}`, user, { headers: this.getHeaders() });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  editUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/alluser`, { headers: this.getHeaders() });
  }

  getUserByUsername(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/get-user-by-username?username=${username}`, { headers: this.getHeaders() });
  }

}
