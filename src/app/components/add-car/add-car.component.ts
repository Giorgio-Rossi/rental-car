import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from  '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CarService } from '../../service/car.service.service'; 

@Component({
  selector: 'app-add-car',
  imports: [FormsModule, NgIf],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})

export class AddCarComponent implements OnInit {
  router = inject(Router);
  authService = inject(AuthService)
  carService = inject(CarService)

  car = {
    id: 0, 
    brand: '',
    model: '',
    licensePlate: null,
    status: 'Disponibile',
    updatedAt: new Date().toISOString()
  };
  
  ngOnInit(): void {
    const userRole = this.authService.getUserType(); 
    if (userRole !== 'ROLE_ADMIN') {
      this.router.navigate(['/home']);
    }  
  }


  onSubmit() {
    const userRole = this.authService.getUserType(); 
    if (userRole === 'ROLE_ADMIN') {

      this.carService.createCar(this.car).subscribe(
        response => {
          console.log('Auto aggiunta:', response);
          this.resetForm();
          this.router.navigate(['/manage-cars']); 
        },
        error => {
          console.error('Errore nel salvataggio dell\'auto:', error);
        }
      );
    } else {
      console.log('Accesso non autorizzato');
      this.router.navigate(['/home']);
    }
  }

  resetForm() {
    this.car = {
      id:0,
      brand: '',
      model: '',
      licensePlate: null,
      status: 'Disponibile',
      updatedAt: new Date().toISOString()

    };
  }
}



