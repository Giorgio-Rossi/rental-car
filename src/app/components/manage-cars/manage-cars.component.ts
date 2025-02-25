import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableConfig } from '../../components/table/table-config.interface';
import { TableComponent } from "../../components/table/table.component";
import { ManageCarsService } from '../../service/manage-cars.service';
import { Car } from '../../interface/car.model.interface';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-manage-cars',
  imports: [ReactiveFormsModule, TableComponent],
  templateUrl: './manage-cars.component.html',
  styleUrl: './manage-cars.component.css'
})

export class ManageCarsComponent implements OnInit {
  cars: Car[] = [];

  tableManageCars: TableConfig = {
    headers: [
      { key: 'id', columnName: 'ID', type: 'Number', ordinable: true, filtrable: true},
      { key: 'brand', columnName: 'Marca ', type: 'String', ordinable: true, filtrable: true},
      { key: 'model', columnName: 'Modello', type: 'String', ordinable: true, filtrable: true},
      { key: 'license_plate', columnName: 'Targa', type: 'String', ordinable: true, filtrable: true},
      { key: 'status', columnName: 'Stato', type: 'String', ordinable: true, filtrable: true},


    ],
    currentByDefault: {key: 'id', orderby: 'asc'},
    pagination: {itemsPerPage: 10, currentPage:1},
    actions: {actions: [ 'Modifica', 'Elimina' ]}
  };

  constructor(private router: Router, private requestService: ManageCarsService, private authService: AuthService){}

  ngOnInit(): void {
    const userRole = this.authService.getUserType(); 
    if (userRole !== 'ADMIN') {
      this.router.navigate(['/home']);
    }

    this.loadCars();  
  }

  loadCars(): void {
    this.requestService.getAvailableCars().subscribe(cars => {
      this.cars = cars;  
    });
  }


  handleActionClick(action: string, data: any): void{
    if (action === 'Modifica') {
      this.router.navigate(['/edit-cars', data.id],  {state: {carData: data } });
      console.log('ID auto:', data.id)
    }
    if (action === 'Elimina') {
      console.log('Azione di elimina inviata')
    }
  }
}
