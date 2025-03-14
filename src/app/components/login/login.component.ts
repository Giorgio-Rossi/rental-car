import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { StorageService } from '../../service/storage.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username: string = '';
  password: string = '';

  passwordVisibile: boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  form: any = {
    username: null,
    password: null
  };

  authService = inject(AuthService);
  router = inject(Router);
  storageService = inject(StorageService);
  userType: String = '';

  togglePasswordVisibility(): void {
    this.passwordVisibile = !this.passwordVisibile;
  }
  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: (data: any) => {


        this.userType = this.authService.getUserType();

        if (data && data.token) {
          const user = {
            username: data.username,
            role: this.userType || 'ROLE_CUSTOMER',
          };

          this.storageService.saveToken(data);
          this.storageService.saveUser(user);

          this.isLoginFailed = false;
          this.isLoggedIn = true;

          this.router.navigate(['/home']);
        } else {
          this.isLoginFailed = true;
          this.errorMessage = 'Login failed';
        }
      },
      error: err => {
        console.error('Login failed', err);
        this.errorMessage = err || 'An error occurred';
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
