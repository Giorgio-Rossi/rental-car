import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from  '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  constructor(private authService: AuthService, private router: Router){}

  onSubmit(){
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/home']);
    } else {
      alert('Credenziali non valide');
    }

  }
}
