import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { UserService } from '../../service/user.service';  // Importa il servizio degli utenti
import { NgIf, NgFor, DatePipe, CommonModule } from '@angular/common';
import { TableConfig } from '../table/table-config.interface';
import { TableComponent } from "../table/table.component";
import { CarRequestService } from '../../service/CarRequest.service';
import { Router } from '@angular/router';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, TableComponent, CommonModule, ButtonComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  userType: string = '';
  isLogged: boolean = false;
  requests: any[] = [];
  users: any[] = [];
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
            start_reservation: request.start_reservation ? request.start_reservation : null,
            end_reservation: request.end_reservation ? request.end_reservation : null
          };

          console.log('Updated request with:', updatedRequest);
          return updatedRequest;
        });
      });
    });
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

   buttonConfigsAdmin = [
      { label: 'Home', action: () => this.router.navigate(['/home']) },
      //{ label: 'Logout', action: () => this.logout() },
      { label: 'Gestisci richieste', action: () => this.router.navigate(['/manage-requests']) },
      { label: 'Gestisci auto', action: () => this.router.navigate(['/manage-cars']) },
      { label: 'Aggiungi auto', action: () => this.router.navigate(['/add-car']) },
      { label: 'Gestici utenti', action: () => this.router.navigate(['/manage-users']) },
      { label: 'Aggiungi utente', action: () => this.router.navigate(['/add-user']) }
    ];
  
    
    buttonConfigsUser = [
      { label: 'Home', action: () => this.router.navigate(['/home']) },
      //{ label: 'Logout', action: () => this.logout() },
      { label: 'Aggiungi richieste di prenotazione', action: () => this.router.navigate(['/new-request']) },
    ];

  logout() {
    this.authService.logout();
    this.userType = '';
  }
}
