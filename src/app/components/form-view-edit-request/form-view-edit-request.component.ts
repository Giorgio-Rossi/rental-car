import { Component, OnInit } from '@angular/core';
import { CarRequest } from '../../interface/CarRequest.model.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { FormsModule } from '@angular/forms';
import { Car } from '../../interface/car.model.interface';
import { ManageCarsService } from '../../service/manage-cars.service';

@Component({
  selector: 'app-form-view-edit-request',
  imports: [NgIf, NgFor, ButtonComponent, FormsModule],
  templateUrl: './form-view-edit-request.component.html',
  styleUrl: './form-view-edit-request.component.css'
})
export class FormViewEditRequestComponent implements OnInit {
  requestData!: CarRequest;
  title: string = 'Dettaglio Richiesta';
  availableCars: Car[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private manageCarsService: ManageCarsService){}

  buttonConfig = [
    {label: 'Salva', action: () => console.log('Azione di salvataggio')},
    {label: 'Chiudi', action: () => this.router.navigate(['/manage-request'])}
  ]

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const requestID = params.get('id');
      const navigationData = history.state.requestData; 

      if (navigationData) {
        this.requestData = navigationData;
        console.log('Navigation data:', navigationData); 
      }
    });

    this.manageCarsService?.getAvailableCars().subscribe(cars => {
        this.availableCars = cars;
      });
  }


  formatDate(value: string, key: string): string {
    if (!value) return '';

    const date = new Date(value);
    
    if (key === 'created_at' || key === 'updated_at' || key === 'start_reservation' || key === 'end_reservation') {
      return date.toLocaleDateString('it-IT', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    }
    
    return value;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  updateStatus(event: Event, requestData: any):void{
    console.log('Status aggiornato: ', this.requestData)
    console.log('Status passato come param: ', event.target)
  }

  
}
