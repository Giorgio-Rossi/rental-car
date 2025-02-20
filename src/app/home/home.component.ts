import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  userType: string;

  constructor(public  authService: AuthService){
    this.userType = this.authService.getUserType(); 
  }

}
