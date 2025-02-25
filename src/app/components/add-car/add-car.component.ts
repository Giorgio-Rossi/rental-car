import { Component, OnInit } from '@angular/core';
import { FormsModule } from  '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
 
@Component({
  selector: 'app-add-car',
  imports: [FormsModule, NgIf],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent implements OnInit {
  car = {
    brand: '',
    model: '',
    license_plate: null,
    status: 'Disponibile'
  };
  constructor(private router: Router, private authService: AuthService){}
  
  ngOnInit(): void {
    const userRole = this.authService.getUserType(); 
    if (userRole !== 'ADMIN') {
      this.router.navigate(['/home']);
    }  
  }


  onSubmit() {
    console.log('Auto aggiunta:', this.car);
    this.resetForm();
  }

  resetForm() {
    this.car = {
      brand: '',
      model: '',
      license_plate: null,
      status: 'Disponibile'
    };
  }
}
