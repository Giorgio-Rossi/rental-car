import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_USERS } from '../mock-data/mock-users';  
import { User } from '../interface/user.model.interface';  
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8080/users';  

  http = inject(HttpClient)
  
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }
  
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  
  deleteUser(id: number): Observable<User>{
    return this.http.delete<User>(`${this.apiUrl}/${id}`);
  }
  
  editUser(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/alluser`);
  }
  
}
