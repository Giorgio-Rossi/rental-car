import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../button/button.component";
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [FormsModule, ButtonComponent, NgFor],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {
  currentUserRole: string = '';

  @Input() buttons: { label: string; action: () => void }[] = [];
  @Input() username: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  /*
  logout(): void {
    if (this.username) {
      this.authService.logout(this.username).subscribe(
        response => {
          localStorage.removeItem('currentUser');  
          this.router.navigate(['/login']);  
        },
        error => {
          console.error('Logout error:', error);
        }
      );
    } else {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    }
  }
    */
}