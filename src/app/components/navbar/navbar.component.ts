import { Component, Input, OnInit } from '@angular/core';
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


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}