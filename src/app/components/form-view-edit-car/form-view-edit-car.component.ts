import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-view-edit-car',
  imports: [NgIf, NgFor],
  templateUrl: './form-view-edit-car.component.html',
  styleUrls: ['./form-view-edit-car.component.css']
})
export class FormViewEditCarComponent implements OnInit {
  title: string = 'Dettagli auto';
  carData: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const carID = params.get('id');
      const navigationData = history.state.carData; // Recupero i dati passati nella navigazione

      if (navigationData) {
        this.carData = navigationData;
        console.log(navigationData); 
      }
    });
  }
  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
  updateStatus(newStatus: string):void{
    this.carData.status = newStatus;
    console.log('Status aggiornato: ', this.carData.status)
    console.log('Status passato come param: ', newStatus)
  }
}
