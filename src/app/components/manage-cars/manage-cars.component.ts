import { Component, inject, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TableConfig } from '../../components/table/table-config.interface';
import { TableComponent } from "../../components/table/table.component";
import { ManageCarsService } from '../../service/manage-cars.service';
import { Car } from '../../interface/car.model.interface';
import { NavbarComponent } from "../navbar/navbar.component";
import { AuthService } from '../../service/auth.service';
import { CarService } from '../../service/car.service.service';

@Component({
  selector: 'app-manage-cars',
  imports: [ReactiveFormsModule, TableComponent],
  templateUrl: './manage-cars.component.html',
  styleUrl: './manage-cars.component.css'
})

export class ManageCarsComponent implements OnInit {
  router = inject(Router);
  requestService = inject(ManageCarsService);
  authService = inject(AuthService);
  carService = inject(CarService)
  
  cars: Car[] = [];

  tableManageCars: TableConfig = {
    headers: [
      { key: 'id', columnName: 'ID', type: 'Number', ordinable: true, filtrable: true},
      { key: 'brand', columnName: 'Marca ', type: 'String', ordinable: true, filtrable: true},
      { key: 'model', columnName: 'Modello', type: 'String', ordinable: true, filtrable: true},
      { key: 'licensePlate', columnName: 'Targa', type: 'String', ordinable: true, filtrable: true},
      { key: 'status', columnName: 'Stato', type: 'String', ordinable: true, filtrable: true},


    ],
    currentByDefault: {key: 'id', orderby: 'asc'},
    pagination: {itemsPerPage: 10, currentPage:1},
    actions:  {
      actions: [
        {
          name:'Modifica',
          visible: (row: any) => true, 
        },
        {
          name: 'Elimina',
          visible: (row: any) => true, 
        }
       ]}
  };


  ngOnInit(): void {
    const userRole = this.authService.getUserType(); 
    if (userRole !== 'ROLE_ADMIN') {
      this.router.navigate(['/home']);
    }

    this.loadCars();  
  }

  loadCars(): void {
    this.requestService.getAllCars().subscribe(cars => {
//      console.log('Dati ricevuti:', cars)
      this.cars = cars;  
    });
  }


  handleActionClick(action: string, data?: Car): void{
//    console.log('Event received:', { action, data });
//    console.log('ID auto:', data?.id)
    if (action === 'Modifica') {
      this.router.navigate(['/edit-cars', data?.id],  {state: {carData: data } });

    }
    if (action === 'Elimina') {
      this.carService.deleteCar(data?.id).subscribe({
        next: () => {
//          console.log('Auto eliminata con successo');
          this.cars = this.cars.filter(car => car.id !== data?.id);

        },
        error: (err) => {
          console.error('Errore durante l\'eliminazione dell\'auto:', err);
        }
      });
    }
  }
}
