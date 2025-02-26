import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';  // Importa il servizio degli utenti
import { NgIf, NgFor, DatePipe, CommonModule } from '@angular/common';
import { TableConfig } from '../table/table-config.interface';
import { TableComponent } from "../table/table.component";
import { CarRequestService } from '../../service/CarRequest.service';
import { Router } from '@angular/router';
import { ButtonComponent } from "../button/button.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { ButtonConfig } from '../button/button-config.interface';
import { Car } from '../../interface/car.model.interface';
import { User } from '../../interface/user.model.interface';
import { ManageCarsService } from '../../service/manage-cars.service';
import { CarRequest } from '../../interface/CarRequest.model.interface';
import { getButtonConfigsAdmin, getButtonConfigsUser, getTableAdminConfig, getTableCustomerConfig } from '../config/home-config';

@Component({
  selector: 'app-home',
  imports: [NgIf, TableComponent, CommonModule, NavbarComponent],
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
      if(currentUser.type === 'ADMIN'){
        this.isAdmin = true;
      }
    }
  
    this.isLogged = this.authService.checkLogin();
    console.log('Is logged:', this.isLogged);

    this.tableAdminConfig = getTableAdminConfig();
    this.tableCustomerConfig = getTableCustomerConfig(this.carRequestService);
    this.buttonConfigsAdmin = getButtonConfigsAdmin(this.router);
    this.buttonConfigsUser = getButtonConfigsUser(this.router);
  
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
          this.requests = requests.map(request => {
        
            const user = this.users.find(u => u.id === request.user_id);
        
            const carDetails = request.car_id.map(carId => {
              const car = this.cars.find(car => car.id === carId);  
              return car ? car.model : 'Unknown';  
            }).join(', ');
  
            const updatedRequest = {
              ...request,
              fullName: user?.fullName || 'Unknown',
              start_reservation: request.start_reservation ? this.datePipe.transform(request.start_reservation, "dd/MM/yyyy") : null,
              end_reservation: request.end_reservation ? this.datePipe.transform(request.end_reservation, "dd/MM/yyyy") : null,
              carDetails: carDetails || 'Unknown'  
            };
  
            return updatedRequest;
          });
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

  logout() {
    this.authService.logout();
    this.userType = '';
  }
  

}
