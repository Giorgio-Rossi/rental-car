import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MOCK_USERS } from './mock-data/mock-users'; 
import { NgFor } from '@angular/common';
import { LoginComponent } from './login/login.component'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'rental-car';
  
  users = MOCK_USERS;
}
