import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  apiUrl = 'http://localhost:8080';
  router = inject(Router);
  http = inject(HttpClient);

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiUrl}/auth/login`, { username, password }).pipe(
      tap(response => {
        const decodedToken: any = jwtDecode(response.token);
        this.setToken(response.token);
        this.setUser({
          id: decodedToken.id,
          username: decodedToken.sub,
          email: decodedToken.email,
          role: decodedToken.role 
          }
        )}
      )
    );
  }

  setToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout() {
    const token = this.getToken();
    if (token) {
      this.http.delete(`${this.apiUrl}/auth/logout`, {
        headers: new HttpHeaders({ 'Authorization': `Bearer ${token}` })
      }).subscribe({
        next: () => {
          localStorage.removeItem('auth_token');
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Errore durante il logout:', error);
          localStorage.removeItem('auth_token');
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        }
      });
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); 
  }

  getUserType(): string {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.role;
      } catch (error) {
        console.error('Errore nel decodificare il token', error);
        return '';
      }
    }
    return '';
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

  refreshToken() {
    return this.http.post<{ token: string }>('/api/auth/refresh', {}).pipe(
      tap(response => this.setToken(response.token))
    );
  }
}
