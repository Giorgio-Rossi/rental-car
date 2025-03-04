import { Component, inject, OnInit } from '@angular/core';
import { CarRequest } from '../../interface/CarRequest.model.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AuthService } from '../../service/auth.service';
import { NgFor } from '@angular/common';
import { Car } from '../../interface/car.model.interface';
import { ManageCarsService } from '../../service/manage-cars.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-request-user',
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './add-request-user.component.html',
  styleUrl: './add-request-user.component.css'
})

export class AddRequestUserComponent implements OnInit {
  addRequestForm!: FormGroup;
  loggedInUser: string = '';  
  currentUserID: string ='';
  currentUserRole: string ='';
  availableCars: Car[] = []; 

  private apiUrl = 'http://localhost:8080/api/car-requests/create-request';  

  authService = inject(AuthService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  manageCars = inject(ManageCarsService)
  http = inject(HttpClient);


  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.loggedInUser = currentUser.user;  
      console.log(currentUser);
      this.currentUserID = currentUser.id;
      console.log('Current user id:', currentUser.id);
      
      this.currentUserRole = currentUser.role;
      console.log('Current user role', currentUser.role)
    }
  
    this.manageCars.getAvailableCars().subscribe((cars: Car[]) => { 
      this.availableCars = cars;
      console.log('Auto disponibili:', this.availableCars);
    });

    
    this.addRequestForm = this.formBuilder.group({
      car_id: [null, Validators.required], 
      start_reservation: [null, Validators.required], 
      end_reservation: [null, Validators.required],  
      user_id: [this.currentUserID],  
    });
  }

 
  onSubmit(): void {
    if (this.addRequestForm.valid) {
      const formData = this.addRequestForm.value;

    
      const newRequest: CarRequest = {
        userID: Number(this.currentUserID),
        carID: Number(formData.car_id),
        startReservation: formData.start_reservation,
        endReservation: formData.end_reservation,
        status: 'IN_ATTESA',
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString(),
        id: 0
      };

      console.log('Nuova richiesta:', newRequest);

      this.http.post<CarRequest>(this.apiUrl, newRequest).subscribe({
        next: response => {
          console.log('Richiesta salvata:', response);
          this.router.navigate(['/manage-users']);
        },
        error: error => {
          console.error('Errore nel salvataggio della richiesta:', error);
        }
      });
    }
  }
}
