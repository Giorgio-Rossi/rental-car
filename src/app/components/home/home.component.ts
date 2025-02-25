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

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, TableComponent, CommonModule, ButtonComponent, NavbarComponent],
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

  constructor(
    public authService: AuthService,
    private carRequestService: CarRequestService,
    private userService: UserService,  
    private datePipe: DatePipe,
    private router: Router,  ) {}

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

    if (this.isLogged) {
      this.userType = this.authService.getUserType();
      console.log('User type:', this.userType);
    }

    this.userService.getUsers().subscribe(users => {
      this.users = users;
      console.log('Users:', this.users);
      
      this.carRequestService.getRequests().subscribe(requests => {
        this.requests = requests.map(request => {
          console.log('Processing request:', request);
          const user = this.users.find(u => u.id === request.user_id);
          console.log('Found user:', user);

          const updatedRequest = {
            ...request,
            fullName: user?.fullName || 'Unknown',
            start_reservation: request.start_reservation ? this.datePipe.transform(request.start_reservation, "dd/MM/yyy") : null,
            end_reservation: request.end_reservation ? this.datePipe.transform(request.end_reservation, "dd/MM/yyy") : null,
          };

          console.log('Updated request with:', updatedRequest);
          return updatedRequest;
        });
      });
    });

    console.log('Button Configs Admin:', this.buttonConfigsAdmin);
    console.log('Button Configs User:', this.buttonConfigsUser);
  }

  tableAdminConfig: TableConfig = {
    headers: [
      { key: 'id', columnName: 'Codice richiesta', type: 'Number', ordinable: true, filtrable: true },
      { key: 'car_id', columnName: 'Macchina', type: 'Number', ordinable: true, filtrable: true },
      { key: 'fullName', columnName: 'Cliente', type: 'String', ordinable: true, filtrable: true },
      { key: 'status', columnName: 'Stato prenotazione', type: 'Date', ordinable: false, filtrable: true }
    ],
    currentByDefault: { key: 'id', orderby: 'asc' },
    pagination: { itemsPerPage: 10, currentPage: 1 },
    actions: { actions: ['Modifica', 'Cancella'] }
  };

  tableCustomerConfig: TableConfig = {
    headers: [
      { key: 'id', columnName: 'Codice richiesta', type: 'Number', ordinable: true, filtrable: true },
      { key: 'status', columnName: 'Stato prenotazione', type: 'String', ordinable: true, filtrable: true },
      { key: 'start_reservation', columnName: 'Data inizio prenotazione', type: 'Date', ordinable: true, filtrable: true },
      { key: 'end_reservation', columnName: 'Data fine prenotazione', type: 'Date', ordinable: false, filtrable: true },
      { key: 'car_id', columnName: 'Macchina', type: 'Number', ordinable: false, filtrable: true }
    ],
    currentByDefault: { key: 'id', orderby: 'asc' },
    pagination: { itemsPerPage: 10, currentPage: 1 },
    actions: { actions: ['Modifica', 'Cancella'] }
  };


  
   buttonConfigsAdmin =  [
    { label: 'Home', action: () => this.router.navigate(['/home']) },
    //{ label: 'Logout', action: () => this.logout() },
    { label: 'Gestisci richieste', action: () => this.router.navigate(['/manage-requests']) },
    { label: 'Gestisci auto', action: () => this.router.navigate(['/manage-cars']) },
    { label: 'Aggiungi auto', action: () => this.router.navigate(['/add-car']) },
    { label: 'Gestici utenti', action: () => this.router.navigate(['/manage-users']) },
    { label: 'Aggiungi utente', action: () => this.router.navigate(['/add-user']) }
    ]

    
    buttonConfigsUser = [
      { label: 'Home', action: () => this.router.navigate(['/home']) },
      //{ label: 'Logout', action: () => this.logout() },
      { label: 'Aggiungi richieste di prenotazione', action: () => this.router.navigate(['/new-request']) },
    ];
    
    handleActionClick(action: string, data: any): void {
    const currentUserType = this.authService.getCurrentUser()
      if(currentUserType.role === 'CUSTOMER'){
          if (action === 'Modifica') {
            this.router.navigate(['/edit-request', data.id], {state: {requestData: data}});
            console.log('ID richiesta: ', data.id)
          }
      
          if (action === 'Elimina') {
            console.log('Azione di elimina inviata');
          }
        }
        if(currentUserType === 'ADMIN'){}
      }

      getCarById(carId: number): Car | undefined {
        return this.cars.find(car => car.id === carId);
      }
      
    
  logout() {
    this.authService.logout();
    this.userType = '';
  }
}
