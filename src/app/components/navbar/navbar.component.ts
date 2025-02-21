import { Component, OnInit } from '@angular/core';
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

export class NavbarComponent implements OnInit {
  isAdmin: boolean = false;
  username: string = '';

  buttonConfigs = [
    { label: 'Home', action: () => this.router.navigate(['/home']) },
    //{ label: 'Logout', action: () => this.logout() },
    { label: 'Gestisci richieste', action: () => this.router.navigate(['/manage-requests']) },
    { label: 'Aggiungi auto', action: () => this.router.navigate(['/add-car']) }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.username = currentUser.username;
      if(currentUser.type === 'ADMIN'){
        this.isAdmin = true;
      }
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}