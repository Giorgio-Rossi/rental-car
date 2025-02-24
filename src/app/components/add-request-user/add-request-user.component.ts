import { Component, OnInit } from '@angular/core';
import { CarRequest } from '../../interface/CarRequest.model.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CarRequestService } from '../../service/CarRequest.service';
import { AuthService } from '../../service/auth.service';
import { MOCK_CARS } from '../../mock-data/mock-cars';
import { NgFor, NgIf } from '@angular/common';
import { Car } from '../../interface/car.model.interface';
import { ManageCarsService } from '../../service/manage-cars.service';


@Component({
  selector: 'app-add-request-user',
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './add-request-user.component.html',
  styleUrl: './add-request-user.component.css'
})

export class AddRequestUserComponent implements OnInit {
  addRequestForm!: FormGroup;
  loggedInUser: string = '';  
  currentUserID: string ='';
  currentUserRole: string ='';
  availableCars: Car[] = []; 

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private manageCars: ManageCarsService 
  ) {}

  ngOnInit(): void {
    console.log(MOCK_CARS)

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
    user_id: [{ value: this.loggedInUser, disabled: true }, Validators.required], 
    car_id: ['', Validators.required], 
    start_reservation: ['', Validators.required],
    end_reservation: ['', Validators.required],
    status: ['In attesa', Validators.required],
      });
  }
  
  onSubmit() {
    if (this.addRequestForm.valid) {
      const newRequest: CarRequest = this.addRequestForm.value;
      newRequest.created_at = new Date();
      newRequest.updated_at = new Date();
      console.log('Nuova richiesta:', newRequest);      
      this.router.navigate(['/new-request']); 
    }
  }
}
