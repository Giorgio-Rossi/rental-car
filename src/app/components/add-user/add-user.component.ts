import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interface/user.model.interface';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  imports: [FormsModule]
})

export class AddUserComponent implements OnInit {
  
  private apiUrl = 'http://localhost:8080/admin';  


  http = inject(HttpClient);
  router = inject(Router);
  authService = inject(AuthService);

  user = {
    id: null,
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
      if (userRole !== 'ADMIN') {
        this.router.navigate(['/home']);
      }  
  }
  saveUser() {
    this.user.created_at = new Date(); 
    this.user.updated_at = new Date();
    
    this.http.post<User>(`${this.apiUrl}/add-user`, this.user).subscribe(
      response => {
        console.log('Utente salvato:', response);
        this.router.navigate(['/manage-users']);
      },
      error => {
        console.error('Errore nel salvataggio dell\'utente:', error);
      }
    );
  }
  
}
