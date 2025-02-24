import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from './service/user.service';
import { CarRequestService } from './service/CarRequest.service';
import { ManageCarsService } from './service/manage-cars.service';
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
    private userService: UserService,
    private carRequestService: CarRequestService,
    private manageCarsService: ManageCarsService
  ) {}

  ngOnInit(): void {
    this.path = this.router.url;
    
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });

    this.carRequestService.getRequests().subscribe(requests => {
      this.requests = requests;
    });

    this.manageCarsService.getAllCars().subscribe(cars => {
      this.cars = cars;
    });
  }
}
