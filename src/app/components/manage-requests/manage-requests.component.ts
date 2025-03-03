import { Component, inject, OnInit } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { ButtonConfig } from '../button/button-config.interface';
import { CarRequestService } from '../../service/CarRequest.service';
import { CarRequest } from '../../interface/CarRequest.model.interface';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { TableConfig } from '../table/table-config.interface';
import { UserService } from '../../service/user.service';
import { CarService } from '../../service/car.service.service';
import { Car } from '../../interface/car.model.interface';
import { User } from '../../interface/user.model.interface';
import { ManageCarsService } from '../../service/manage-cars.service';

@Component({
  selector: 'app-manage-requests',
  imports: [NgFor, NgIf],
  templateUrl: './manage-requests.component.html',
  styleUrls: ['./manage-requests.component.css'],
  providers: [DatePipe]
})

export class ManageRequestsComponent implements OnInit {
  requestsCar: CarRequest[] = [];  
  users: User[] = []; 
  cars: Car[] = [];
  
  manageCarsService = inject(ManageCarsService)
  requestService = inject(CarRequestService);
  authService = inject(AuthService);
  router = inject(Router);
  userService = inject(UserService); 
  carService = inject(CarService);
  carRequstService = inject(CarRequestService);
  datePipe = inject(DatePipe);
  

  ngOnInit(): void {
    this.manageCarsService.getAllCars().subscribe(cars => {
      this.cars = cars;
      console.log('Cars:', this.cars);
  
      this.userService.getUsers().subscribe(users => {
        this.users = users;
        console.log('Users:', this.users);
  
        this.carRequstService.getRequests().subscribe(requests => {
          console.log('Requests:', requests);
          this.requestsCar = requests.map(request => {

            const user = this.users.find(u => u.id === request.userID);
          
            console.log('User found', user)
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

          console.log(this.requestsCar); 
        });
      });
    });

    const userRole = this.authService.getUserType();
    if (userRole !== 'ADMIN') {
      this.router.navigate(['/home']);
    }
  }
  tableConfig: TableConfig = {
    headers: [
      { key: 'id', columnName: 'ID', type: 'Number', ordinable: true },
      { key: 'fullName', columnName: 'Cliente', type: 'String' },
      { key: 'carsDetail', columnName: 'Auto richiesta', type: 'String' },
      { key: 'status', columnName: 'Stato', type: 'String', ordinable: true, filtrable: true }
    ],
    currentByDefault: { key: 'id', orderby: 'asc' },
    pagination: { itemsPerPage: 10, currentPage: 1 },
    actions: {
      actions: [
        { name: 'Approva', visible: (row) => row.status !== 'Annullata' },
        { name: 'Rifiuta', visible: (row) => row.status !== 'Annullata' }
      ]
    }
  };

  buttonConfigs: ButtonConfig[] = [
    { 
      label: 'Approva', 
      action: (id: number) => this.updateRequest(id, 'APPROVATO'), 
      type: 'button', 
      style: {
        color: 'white',
        backgroundColor: 'green',
        border: '1px solid green'
      }
    },
    { 
      label: 'Rifiuta', 
      action: (id: number) => this.updateRequest(id, 'RIFIUTATO'), 
      type: 'button', 
      disabled: false, 
      style: {
        color: 'white',
        backgroundColor: 'red',
        border: '1px solid red'
      }
    }
  ];
  
  updateRequest(id: number, status: string): void {
    console.log('id request: ', id);
    const request = this.requestsCar.find(r => r.id === id);
    if (request) {
      this.requestService.updateRequestStatus(id, status).subscribe(updatedRequest => {
        request.status = updatedRequest!.status;  
        alert(`Richiesta ${id} ${status}`);
      });
    }
  }

  handleActionClick(action: string, data: any) {
    if (action === 'Modifica') {
      this.router.navigate(['/manage-request', data.id], {state: {userData: data}});
    }

    if (action === 'Elimina') {
      console.log('Azione di elimina inviata');
    }
  }
}