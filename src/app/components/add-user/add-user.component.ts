import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interface/user.model.interface';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  imports: [FormsModule]
})

export class AddUserComponent implements OnInit {

  private apiUrl = 'http://localhost:8080/admin';
  private lastUserIdUrl = 'http://localhost:8080/admin/last-user-id'

  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  user = {
    id: 0,
    username: '',
    fullName: '',
    email: '',
    role: '',
    password: '',
    created_at: new Date,
    updated_at: new Date
  };


  ngOnInit(): void {
    const userRole = this.authService.getUserType();
    if (userRole !== 'ROLE_ADMIN') {
      this.router.navigate(['/home']);
    }
  }

  getLastUserId(): Observable<number> {
    return this.http.get<number>(this.lastUserIdUrl, { headers: this.getHeaders() });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  }

  saveUser() {
    this.user.created_at = new Date();
    this.user.updated_at = new Date();
  
    this.http.post<User>(`${this.apiUrl}/add-user`, this.user, { headers: this.getHeaders() })
      .subscribe({
        next: (response) => {
          this.router.navigate(['/manage-users']);
        },
        error: (error) => {
          console.error('Errore nel salvataggio dell\'utente:', error);
          console.error('Status:', error.status);
          console.error('Message:', error.message);
          if (error.error) {
            console.error('Error Body:', error.error);
          }
        }
      });
  }
  
}
