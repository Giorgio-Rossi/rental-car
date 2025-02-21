import { Component, OnInit } from '@angular/core';
import { Request } from '../../interface/request.model.interface';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Importa ReactiveFormsModule
import { RequestService } from '../../service/request.service';
import { AuthService } from '../../service/auth.service';
import { MOCK_CARS } from '../../mock-data/mock-cars';


@Component({
  selector: 'app-add-request-user',
  imports: [ReactiveFormsModule],
  templateUrl: './add-request-user.component.html',
  styleUrl: './add-request-user.component.css'
})
export class AddRequestUserComponent implements OnInit {
  addRequestForm!: FormGroup;
  loggedInUser: string = '';  
  availableCars = MOCK_CARS;
  

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private requestService: RequestService 
  ) {}

  ngOnInit(): void {
    console.log(MOCK_CARS)

    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.loggedInUser = currentUser.user;  
      console.log(currentUser)
    }
  
  this.availableCars = MOCK_CARS.filter(car => car.status === 'Disponibile');
  console.log('Auto dopo il filtro:', this.availableCars);

  this.addRequestForm = this.formBuilder.group({
    user_id: [{ value: this.loggedInUser, disabled: true }, Validators.required], // Precompilato e disabilitato
    car_id: ['', Validators.required], 
    start_reservation: ['', Validators.required],
    end_reservation: ['', Validators.required],
    status: ['In attesa', Validators.required],
      });
  }
  
  onSubmit() {
    if (this.addRequestForm.valid) {
      const newRequest: Request = this.addRequestForm.value;
      newRequest.created_at = new Date();
      newRequest.updated_at = new Date();
      console.log('Nuova richiesta:', newRequest);      
      this.router.navigate(['/new-request']); 
    }
  }
}
