import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { TableConfig } from '../table/table-config.interface';
import { MOCK_REQUEST } from '../../mock-data/mock-requests';
import { TableComponent } from "../table/table.component";

@Component({
  selector: 'app-home',
  imports: [NgIf, TableComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit{
  userType: string = '';
  isLogged: boolean = false;
  reservations: any[] = [];  // Popola questa con i dati reali
  requests = MOCK_REQUEST;
  

  constructor(public  authService: AuthService){}

  ngOnInit(): void {
    this.isLogged = this.authService.checkLogin();
    console.log('Is logged:', this.isLogged);  // Debug

    if(this.isLogged){
      this.userType = this.authService.getUserType(); 
      console.log('User type:', this.userType);  // Debug
    }
  }

  logout(){
    this.authService.logout();
    this.userType = '';
  }

  
  tableAdminConfig: TableConfig = {
    headers: [
      { key: 'id', columnName: 'Codice richiesta', type: 'Number', ordinable: true, filtrable: true},
      { key: 'user_id', columnName: 'Cliente', type: 'String', ordinable: true,  filtrable: true},
      { key: 'car_id', columnName: 'Macchina', type: 'Number', ordinable: true,  filtrable: true},
      { key: 'status', columnName: 'Stato prenotazione', type: 'Date', ordinable: false,  filtrable: true}
    ],
    currentByDefault: {key: 'id', orderby: 'asc'}, 
    pagination:{itemsPerPage: 10, currentPage: 1},
    actions: { actions: ['EDIT', 'DELETE'] }
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
    actions: { actions: ['EDIT', 'DELETE'] }
  };
}