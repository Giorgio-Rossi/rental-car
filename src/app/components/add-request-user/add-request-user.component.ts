import { Component, inject, OnInit } from '@angular/core';
import { CarRequest } from '../../interface/CarRequest.model.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Car } from '../../interface/car.model.interface';
import { ManageCarsService } from '../../service/manage-cars.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForOf } from '@angular/common';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-add-request-user',
  imports: [ReactiveFormsModule, NgForOf],
  templateUrl: './add-request-user.component.html',
  styleUrls: ['./add-request-user.component.css']
})

export class AddRequestUserComponent implements OnInit {
  addRequestForm!: FormGroup;
  loggedInUser: string = '';
  currentUserID: string = '';
  currentUserRole: string = '';
  availableCars: Car[] = [];

  private apiUrl = 'http://localhost:8080/api/car-requests/create-request';

  authService = inject(AuthService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  manageCars = inject(ManageCarsService);
  http = inject(HttpClient);
  userService = inject(UserService)
  
  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.loggedInUser = currentUser.username;
      this.currentUserID = currentUser.id;
      this.currentUserRole = currentUser.role;
    }

    this.manageCars.getAvailableCars().subscribe((cars: Car[]) => {
      this.availableCars = cars;
    });

    this.addRequestForm = this.formBuilder.group({
      car_id: [null, Validators.required],
      start_reservation: [null, Validators.required],
      end_reservation: [null, Validators.required],
    });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  onSubmit(): void {
    if (this.addRequestForm.valid) {
      const formData = this.addRequestForm.value;
      const currentUser = this.authService.getCurrentUser(); // Ottieni lo username
  
      if (!currentUser || !currentUser.username) {
        console.error("Errore: utente non autenticato");
        return;
      }
  
      this.userService.getUserByUsername(currentUser.username).subscribe({
        next: user => {
          if (!user || !user.id) {
            console.error("Errore: impossibile ottenere l'ID utente");
            return;
          }
  
          const newRequest: CarRequest = {
            userID: user.id, // Usa l'ID ottenuto dal backend
            carID: Number(formData.car_id),
            startReservation: formData.start_reservation,
            endReservation: formData.end_reservation,
            status: 'IN_ATTESA',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            id: 0
          };
  
          this.http.post<CarRequest>(this.apiUrl, newRequest, { headers: this.getHeaders() }).subscribe({
            next: response => {
              console.log('Richiesta salvata:', response);
              this.router.navigate(['/manage-users']);
            },
            error: error => {
              console.error('Errore nel salvataggio della richiesta:', error);
            }
          });
        },
        error: err => {
          console.error("Errore nel recupero dell'utente:", err);
        }
      });
    }
  }
  
}