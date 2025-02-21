import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { MOCK_USERS } from './mock-data/mock-users'; 
import { NgIf } from '@angular/common';
import { MOCK_REQUEST } from './mock-data/mock-requests';
import { MOCK_CARS } from './mock-data/mock-cars';
import { TableComponent } from "./components/table/table.component";
import { TableConfig } from './components/table/table-config.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'rental-car';
  
  users = MOCK_USERS;
  cars = MOCK_CARS;
  requests = MOCK_REQUEST;
  path?: string;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.path = this.router.url;
  }

}
