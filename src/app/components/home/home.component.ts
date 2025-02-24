import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgIf, NgFor, DatePipe, CommonModule } from '@angular/common';
import { TableConfig } from '../table/table-config.interface';
import { MOCK_REQUEST } from '../../mock-data/mock-requests';
import { TableComponent } from "../table/table.component";
import { MOCK_USERS } from '../../mock-data/mock-users';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-home',
  imports: [NgIf, NgFor, TableComponent, NavbarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [DatePipe]
})

export class HomeComponent implements OnInit{
  userType: string = '';
  isLogged: boolean = false;
  requests = MOCK_REQUEST;
  users = MOCK_USERS;
  

  constructor(public  authService: AuthService, private datePipe: DatePipe){}

  ngOnInit(): void {
    this.isLogged = this.authService.checkLogin();
    console.log('Is logged:', this.isLogged);  

    if(this.isLogged){
      this.userType = this.authService.getUserType(); 
      console.log('User type:', this.userType);  
    }


    //join sugli user
    this.requests = MOCK_REQUEST.map(request => {
      console.log('Processing request:', request);

      const user = MOCK_USERS.find(u => u.id === request.user_id);
      console.log('Found user:', user);

      const updatedRequest = { 
        ...request,
        fullName: user?.fullName || 'Unknown',
        // Formatta le date qui
        start_reservation: request.start_reservation ? new Date(request.start_reservation.toString()) : null,
        end_reservation: request.end_reservation ? new Date(request.end_reservation.toString()) : null
      };

      console.log('Updated request with:', updatedRequest);

      return updatedRequest;
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
      { key: 'id', columnName: 'Codice richiesta', type: 'Number', ordinable: true, filtrable: true},
      { key: 'status', columnName: 'Stato prenotazione', type: 'String', ordinable: true,  filtrable: true},
      { key: 'start_reservation', columnName: 'Data inizio prenotazione', type: 'Date', ordinable: true,  filtrable: true},
      { key: 'end_reservation', columnName: 'Data fine prenotazione', type: 'Date', ordinable: false,  filtrable: true},
      { key: 'car_id', columnName: 'Macchina', type:'Number', ordinable: false,  filtrable: true}
    ],
    currentByDefault: {key: 'id', orderby: 'asc'}, 
    pagination:{itemsPerPage: 10, currentPage: 1},
    actions: { actions: ['Modifica', 'Cancella'] }
  };

  logout(){
    this.authService.logout();
    this.userType = '';
  }
}