import { Component, inject, OnInit } from '@angular/core';
import { CarRequest } from '../../interface/CarRequest.model.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ButtonComponent } from "../button/button.component";
import { FormsModule } from '@angular/forms';
import { Car } from '../../interface/car.model.interface';
import { ManageCarsService } from '../../service/manage-cars.service';
import { CarRequestService } from '../../service/CarRequest.service';

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


  router = inject(Router);
  route = inject(ActivatedRoute);
  manageCarsService = inject(ManageCarsService);
  carRequestService = inject(CarRequestService);


  buttonConfig = [
    { label: 'Salva', action: () => this.saveRequest() },
    { label: 'Chiudi', action: () => this.router.navigate(['/home']) }
  ]
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const requestID = params.get('id');
      const navigationData = history.state.requestData;

      if (navigationData) {
        this.requestData = navigationData;
        this.requestData.startReservation = this.convertToDateInputFormat(this.requestData.startReservation);
        this.requestData.endReservation = this.convertToDateInputFormat(this.requestData.endReservation);
      }
    });


    this.manageCarsService?.getAvailableCars().subscribe(cars => {
      this.availableCars = cars;
    });
  }

  private convertToDateInputFormat(date: string | Date): string {
    if (typeof date === 'string') {
      return date.split('T')[0];
    }
    return date.toISOString().split('T')[0];
  }

  saveRequest(): void {
    if (this.requestData) {
      const updatedRequest = {
        ...this.requestData,
        startReservation: new Date(this.requestData.startReservation).toISOString(),
        endReservation: new Date(this.requestData.endReservation).toISOString()
      };

      this.carRequestService.updateRequest(updatedRequest).subscribe({
        next: (response) => {
//          console.log('Dati aggiornati:', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Errore durante il salvataggio:', error);
        }
      });

      this.carRequestService.updateRequest(updatedRequest).subscribe({
        next: (response) => {
//          console.log('Dati aggiornati:', response);
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Errore durante il salvataggio:', error);
        }
      });
    }
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

  updateStatus(event: Event, requestData: any): void {
//    console.log('Status aggiornato: ', this.requestData)
//    console.log('Status passato come param: ', event.target)
  }


}
