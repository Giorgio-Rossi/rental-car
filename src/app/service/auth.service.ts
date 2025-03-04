import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../interface/user.model.interface';
import { UserResponse } from '../interface/UserResponse';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/login/login';  
  private logoutUrl = 'http://localhost:8080/login/logout'; 
  
  router = inject(Router);
  http = inject(HttpClient);


  login(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
  
    return this.http.post<UserResponse>(  
      this.apiUrl,
      body.toString(),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        }),
        withCredentials: true,
        responseType: 'json'  
      }
    ).pipe(
      tap((response: UserResponse) => {  
        console.log('Login response:', response);
  
        if (response && response.id) {
          const user: User = {
            id: response.id,
            username: response.username,
            role: response.role,
            fullName: response.fullName,
            email: '',
            password: ''
          };
  
          this.setUser(user); 
        } else {
          console.error('Login failed: Invalid response format', response);
        }
      }),
      catchError(error => {
        console.error('Error details:', error);
        let errorMessage = 'An error occurred during login';
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        }
        return throwError(errorMessage);
      })
    );
  }
  
  

  
    logout(username: string): Observable<any> {
      const body = new HttpParams().set('username', username);
    
      return this.http.post(
        this.logoutUrl,
        body.toString(),
        {
          headers: new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded' 
          }),
          withCredentials: true,
          responseType: 'text' 
        }
      ).pipe(
        tap(response => {
          console.log('Logout response:', response);
        }),
        catchError(error => {
          console.error('Error details:', error); 
          let errorMessage = 'An error occurred during logout';
          if (error.error && error.error.message) {
            errorMessage = error.error.message;
          }
          return throwError(errorMessage);
        })
      );
    }
    
  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getUserType(): string {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.role;
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  checkLogin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user && user.username && user.password ? true : false;
  }

  setUser(user: any): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  removeUser(): void {
    localStorage.removeItem('currentUser');
  }
}
