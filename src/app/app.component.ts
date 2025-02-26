import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { User } from './interface/user.model.interface';
import { Car } from './interface/car.model.interface';
import { CarRequest } from './interface/CarRequest.model.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rental-car';
  users: User[] = [];
  cars: Car[] = [];
  requests: CarRequest[] = [];
  path?: string;

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {
  }


}
