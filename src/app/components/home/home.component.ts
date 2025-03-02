import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service'; 
import { NgIf, DatePipe, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableComponent } from "../table/table.component";
import { CarRequestService } from '../../service/CarRequest.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { Car } from '../../interface/car.model.interface';
import { User } from '../../interface/user.model.interface';
import { ManageCarsService } from '../../service/manage-cars.service';
import { getButtonConfigsAdmin, getButtonConfigsUser, getTableAdminConfig, getTableCustomerConfig } from '../config/home-config';

@Component({
  selector: 'app-home',
  imports: [NgIf, TableComponent, CommonModule, NavbarComponent,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  userType: string = '';
  isLogged: boolean = false;
  cars: Car[] = [];
  requests: any[] = [];
  users: User[] = [];
  isAdmin: boolean = false;
  username: string = '';
  currentUserRole: string = '';

  tableAdminConfig: any;
  tableCustomerConfig: any;
  buttonConfigsAdmin: any;
  buttonConfigsUser: any;
  
  constructor(
    public authService: AuthService,
    private carRequestService: CarRequestService,
    private userService: UserService,  
    private datePipe: DatePipe,
    private router: Router, 
    private manageCarsService: ManageCarsService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentUserRole = currentUser.role;
      this.username = currentUser.username;
      if (currentUser.type === 'ADMIN') {
        this.isAdmin = true;
      }
    }
  
    this.isLogged = this.authService.checkLogin();
    console.log('Is logged:', this.isLogged);
  
    if (this.isLogged) {
      this.userType = this.authService.getUserType();
      console.log('User type:', this.userType);
    }
  
    this.manageCarsService.getAllCars().subscribe(cars => {
      this.cars = cars;
      console.log('Cars:', this.cars);
  
      this.userService.getUsers().subscribe(users => {
        this.users = users;
        console.log('Users:', this.users);
  
        this.carRequestService.getRequests().subscribe(requests => {
          console.log('Requests:', requests);
          this.requests = requests.map(request => {

            const user = this.users.find(u => u.id === request.userID);
          
            let carDetails = '';
            if (Array.isArray(request.carID)) {
              carDetails = request.carID.map(carID => {
                const car = this.cars.find(car => car.id === carID);
                return car ? car.licensePlate : 'Unknown';
              }).join(', ');
            } else {
              const car = this.cars.find(car => car.id === request.carID);
              carDetails = car ? (car.licensePlate ?? 'Unknown') : 'Unknown';
            }
          
            return {
              ...request,
              fullName: user?.fullName || 'Unknown',
              start_reservation: request.startReservation ? this.datePipe.transform(request.startReservation, "dd/MM/yyyy") : '',
              end_reservation: request.endReservation ? this.datePipe.transform(request.endReservation, "dd/MM/yyyy") : '',
              carDetails: carDetails || 'Unknown'
            };
          });
      
    this.tableAdminConfig = getTableAdminConfig();
    this.tableCustomerConfig = getTableCustomerConfig(this.carRequestService);
    this.buttonConfigsAdmin = getButtonConfigsAdmin(this.router);
    this.buttonConfigsUser = getButtonConfigsUser(this.router);
  
          console.log('Updated requests:', this.requests);
        });
      });
    });
  }
  

  handleActionClick(action: string, row: any): void {
    if (action === 'Modifica') {
    
      this.router.navigate(['/edit-request', row.id], { state: { requestData: row } });
    } else if (action === 'Cancella') {
      console.log('Cancella richiesta:', row.id);
    }
  }

  getCarById(carId: number): Car | undefined {
    return this.cars.find(car => car.id === carId);
  }
/*
  logout(): void {
    if (this.username) {
      this.authService.logout(this.username).subscribe(
        response => {
          localStorage.removeItem('currentUser');
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Errore nel logout:', error);
        }
      );
    } else {
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
    }
  }
     */
}