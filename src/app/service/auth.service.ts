import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:8080/login/login';  

  router = inject(Router)
  http = inject(HttpClient)

  /*
  login(username: string, password: string): boolean{
    console.log('username:', username)
    console.log('password:',password)
    const user = MOCK_USERS.find(u => (u.username === username || u.email === username) && u.password === password);
    if(user) {
      console.log()
      localStorage.setItem('currentUser', JSON.stringify(user))
      return true;
    }
    return false;
  } 

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login'])
  }
  */
 
  login(username: string, password: string): Observable<any> {
    const body = { username, password };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, body.toString(), { headers });
  }

  logout(username: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
  
    return this.http.post<any>(`${this.apiUrl}/logout`, body.toString());
  }
  
  

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getUserType(): string {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    console.log('User from localStorage:', user); // Controlla cosa c'è in localStorage
    return user.role;
  }
  
  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
  
  checkLogin(): boolean {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user && user.username && user.password ? true : false;
  }
}
