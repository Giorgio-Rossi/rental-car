import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from '../../interface/car.model.interface';
import { ButtonComponent } from "../button/button.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-view-edit-car',
  imports: [NgIf, NgFor, ButtonComponent, FormsModule],
  templateUrl: './form-view-edit-car.component.html',
  styleUrls: ['./form-view-edit-car.component.css']
})
export class FormViewEditCarComponent implements OnInit {
  title: string = 'Dettagli auto';
  carData!: Car;
  statusOptions: string[] = ['Disponibile', 'Non disponibile', 'In manutenzione', ]; 

  constructor(private route: ActivatedRoute, private router: Router) {}

  buttonConfig = [
    {label: 'Salva', action: () => console.log('Azione di salvataggio')},
    {label: 'Chiudi', action: () => this.router.navigate(['/manage-cars'])}
  ]

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const carID = params.get('id');
      const navigationData = history.state.carData; // Recupero i dati passati nella navigazione

      if (navigationData) {
        this.carData = navigationData;
        console.log('navigation data:', navigationData); 
      }
    });
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  updateStatus(event: Event):void{
    const selectElement = event.target as HTMLSelectElement;
    this.carData.status = selectElement.value;
    console.log('Status aggiornato: ', this.carData.status)
    console.log('Status passato come param: ', event.target)
  }
}
