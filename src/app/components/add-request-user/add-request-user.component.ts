import { Component, inject, OnInit } from '@angular/core';
import { CarRequest } from '../../interface/CarRequest.model.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Car } from '../../interface/car.model.interface';
import { ManageCarsService } from '../../service/manage-cars.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { UserService } from '../../service/user.service';
import { CarRequestService } from '../../service/CarRequest.service';

@Component({
  selector: 'app-add-request-user',
  imports: [ReactiveFormsModule, NgForOf, NgIf, NgFor],
  templateUrl: './add-request-user.component.html',
  styleUrls: ['./add-request-user.component.css']
})
export class AddRequestUserComponent implements OnInit {
  addRequestForm!: FormGroup;
  loggedInUser: string = '';
  currentUserID: string = '';
  currentUserRole: string = '';
  availableCars: Car[] = [];
  allCars: Car[] = [];

  private apiUrl = 'http://localhost:8080/customer/add-request';

  authService = inject(AuthService);
  router = inject(Router);
  formBuilder = inject(FormBuilder);
  manageCars = inject(ManageCarsService);
  http = inject(HttpClient);
  userService = inject(UserService);
  carRequestService = inject(CarRequestService);

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.loggedInUser = currentUser.username;
      this.currentUserID = currentUser.id;
      this.currentUserRole = currentUser.role;
    }

    this.manageCars.getAvailableCars().subscribe((cars: Car[]) => {
      this.allCars = cars;
    });

    this.addRequestForm = this.formBuilder.group({
      car_id: [null],
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


  fetchAvailableCars() {
    if (this.addRequestForm.valid) {
      const startDate = this.addRequestForm.value.start_reservation;
      const endDate = this.addRequestForm.value.end_reservation;
//      console.log("Chiamata per ottenere auto disponibili con startDate:", startDate, "e endDate:", endDate);

      this.manageCars.getAvailableCarsByDate(startDate, endDate).subscribe({
        next: (cars: Car[]) => {
          this.availableCars = cars;
//          console.log('Auto disponibili:', this.availableCars);
        },
        error: (error) => {
          console.error('Errore nel recupero delle auto disponibili:', error);
        }
      });
    }
  }


  onSubmit(): void {
    if (this.addRequestForm.valid) {
      const formData = this.addRequestForm.value;
      const currentUser = this.authService.getCurrentUser();

      if (!currentUser?.username) {
        console.error("Errore: utente non autenticato");
        return;
      }

      this.userService.getUserByUsername(currentUser.username).subscribe({
        next: (user) => {
          if (!user?.id) {
            console.error("Errore: ID utente non valido");
            return;
          }

          const startReservation = new Date(formData.start_reservation).toISOString();
          const endReservation = new Date(formData.end_reservation).toISOString();

              const newRequest: CarRequest = {
                userID: user.id !== null ? user.id : 0, 
                carID: Number(formData.car_id),
                startReservation: startReservation,
                endReservation: endReservation,
                status: 'IN_ATTESA',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              };
              
              this.http.post<CarRequest>(this.apiUrl, newRequest, { headers: this.getHeaders() }).subscribe({
                next: (response) => {
//                  console.log('Richiesta salvata:', response);
                  this.router.navigate(['/manage-users']);
                },
                error: (error) => {
                  console.error('Errore nel salvataggio:', error);
                }
              });
            },
            error: (error: any) => {
              console.error('Errore nel recupero dell\'ultimo ID:', error);
            }
          });
        }
    }
} 

