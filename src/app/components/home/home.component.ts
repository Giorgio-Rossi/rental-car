import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';
import { NgIf, DatePipe, CommonModule } from '@angular/common';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { TableComponent } from "../table/table.component";
import { CarRequestService } from '../../service/CarRequest.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { Car } from '../../interface/car.model.interface';
import { User } from '../../interface/user.model.interface';
import { ManageCarsService } from '../../service/manage-cars.service';
import { getButtonConfigsAdmin, getButtonConfigsUser, getTableAdminConfig, getTableCustomerConfig } from '../config/home-config';
import { CarRequest } from '../../interface/CarRequest.model.interface';
import { StorageService } from '../../service/storage.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [NgIf, TableComponent, CommonModule, NavbarComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  userType: string = '';
  cars: Car[] = [];
  requestsCar: CarRequest[] = [];
  requests: any[] = [];
  users: User[] = [];
  isAdmin: boolean = false;
  username: string = '';
  currentUserRole: string = '';

  tableAdminConfig: any;
  tableCustomerConfig: any;
  buttonConfigsAdmin: any;
  buttonConfigsUser: any;
  storageService = inject(StorageService)


  public authService = inject(AuthService);
  private carRequestService = inject(CarRequestService);
  private userService = inject(UserService);
  private datePipe = inject(DatePipe);
  private router = inject(Router);
  private manageCarsService = inject(ManageCarsService);

  ngOnInit(): void {
    this.tableAdminConfig = getTableAdminConfig();
    this.tableCustomerConfig = getTableCustomerConfig(this.carRequestService);
    this.buttonConfigsAdmin = getButtonConfigsAdmin(this.router);
    this.buttonConfigsUser = getButtonConfigsUser(this.router);
  
    const currentUser = this.authService.getCurrentUser();
  
    if (currentUser) {
      this.currentUserRole = currentUser.role;
      this.username = currentUser.username;
      if (currentUser.role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    }
  
    const userId = currentUser.id;
//    console.log('User id:', userId);
  
    this.userType = this.authService.getUserType();
//    console.log('User type:', this.userType);
  
    this.manageCarsService.getAllCars().subscribe(cars => {
      this.cars = cars;
//      console.log('Cars:', this.cars);
  
      this.userService.getUsers().subscribe(users => {
        this.users = users;
//        console.log('Users:', this.users);
  
        if (this.isAdmin) {
          this.carRequestService.getRequests().subscribe((requests: CarRequest[]) => {
//            console.log('Admin Requests:', requests);
            this.requests = this.mapRequests(requests);
          });
        } else {
          this.carRequestService.getRequestsByUserUsername(this.username).subscribe((requests: CarRequest[]) => {
//            console.log('User Requests:', requests);
            this.requests = this.mapRequests(requests);
          });
        }
      });
    });
  }
  
  private mapRequests(requests: CarRequest[]): any[] {
    return requests.map((request: CarRequest) => {
      const user = this.users.find(u => u.id === request.userID);
      let carDetails = '';
  
      if (Array.isArray(request.carID)) {
        carDetails = request.carID
          .map((carID: number) => {
            const car = this.cars.find(car => car.id === carID);
            return car ? car.licensePlate : 'Unknown';
          })
          .join(', ');
      } else if (request.carID !== null && request.carID !== undefined) {
        const car = this.cars.find(car => car.id === request.carID);
        carDetails = car ? (car.licensePlate ?? 'Unknown') : 'Unknown';
      } else {
        carDetails = 'Unknown';
      }
  
      return {
        ...request,
        fullName: user?.fullName || 'Unknown',
        start_reservation: request.startReservation ? this.datePipe.transform(request.startReservation, "dd/MM/yyyy") : '',
        end_reservation: request.endReservation ? this.datePipe.transform(request.endReservation, "dd/MM/yyyy") : '',
        carDetails: carDetails || 'Unknown'
      };
    });
  }
  

  handleActionClick(action: string, row: any): void {
    if (action === 'Modifica') {

      this.router.navigate(['/edit-request', row.id], { state: { requestData: row } });
    } else if (action === 'Cancella') {
      this.carRequestService.deleteRequest(row.id).subscribe({
        next: () => {
          this.requests = this.requests.filter(request => request.id !== row.id);
        },
        error: (err) => {
          console.error('Errore durante l\'eliminazione dell\'auto:', err);
        }
      });
    }
  }

  getCarById(carId: number): Car | undefined {
    return this.cars.find(car => car.id === carId);
  }

  private unsubscribe$ = new Subject<void>();


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  refreshRequests(): void {
    this.carRequestService.getRequests().subscribe(requests => {
      this.requestsCar = requests.map(request => {
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
          userFullName: user?.fullName || 'Unknown',
          start_reservation: request.startReservation ? this.datePipe.transform(request.startReservation, "dd/MM/yyyy") : null,
          end_reservation: request.endReservation ? this.datePipe.transform(request.endReservation, "dd/MM/yyyy") : null,
          carDetails: carDetails || 'Unknown'
        };
      });
    });
  }

}