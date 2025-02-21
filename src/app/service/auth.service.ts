import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MOCK_USERS } from '../mock-data/mock-users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router : Router) { }

  login(username: string, password: string): boolean{
    const user = MOCK_USERS.find(u => u.username === username && u.password === password);
    if(user) {
      localStorage.setItem('currentUser', JSON.stringify(user))
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login'])
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getUserType(): string {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user.type;
  }

  getCurrentUser(): any {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
}
