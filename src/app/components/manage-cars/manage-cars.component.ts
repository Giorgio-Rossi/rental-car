import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MOCK_CARS } from '../../mock-data/mock-cars';
import { TableConfig } from '../../components/table/table-config.interface';
import { TableComponent } from "../../components/table/table.component";

@Component({
  selector: 'app-manage-cars',
  imports: [ReactiveFormsModule, TableComponent],
  templateUrl: './manage-cars.component.html',
  styleUrl: './manage-cars.component.css'
})

export class ManageCarsComponent implements OnInit {
  cars = MOCK_CARS;

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

  constructor(private router: Router){}

  ngOnInit(): void {
  
  }

  handleActionClick(action: string, data: any): void{
    if (action === 'Modifica') {
      this.router.navigate(['/edit-cars', data.id],  {state: {carData: data } });
    }
    if (action === 'Elimina') {
      console.log('Azione di elimina inviata')
    }
  }
}
