import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  imports: [FormsModule]
})
export class AddUserComponent {
  user = {
    id: null,
    username: '',
    fullName: '',
    email: '',
    role: '',
    password: ''
  };

  constructor(public router: Router) {}

  saveUser() {
    console.log('Utente salvato:', this.user);
    this.router.navigate(['/manage-users']);
  }
}
