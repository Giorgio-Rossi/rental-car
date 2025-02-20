import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MOCK_USERS } from './mock-data/mock-users'; 
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'rental-car';
  
  users = MOCK_USERS;

  path?: string;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.path = this.router.url;
  }
}
