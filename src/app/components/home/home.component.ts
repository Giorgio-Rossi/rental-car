import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  userType: string = '';

  constructor(public  authService: AuthService){
  }
  ngOnInit(): void {
    this.userType = this.authService.getUserType(); 
  }

  logout(){
    this.authService.logout();
    this.userType = '';
  }

}