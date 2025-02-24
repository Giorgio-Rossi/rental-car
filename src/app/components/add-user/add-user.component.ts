import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  imports: [FormsModule]
})
export class AddUserComponent implements OnInit {
  user = {
    id: null,
    username: '',
    fullName: '',
    email: '',
    role: '',
    password: ''
  };

    constructor(public router: Router, private authService: AuthService){}
    
    ngOnInit(): void {
      const userRole = this.authService.getUserType(); 
      if (userRole !== 'Admin') {
        this.router.navigate(['/home']);
      }  
    }
  
  saveUser() {
    console.log('Utente salvato:', this.user);
    this.router.navigate(['/manage-users']);
  }
}
