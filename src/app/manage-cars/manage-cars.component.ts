import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Car } from '../interface/car.model.interface';
import { ManageCarsService } from '../service/manage-cars.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-cars',
  imports: [ReactiveFormsModule],
  templateUrl: './manage-cars.component.html',
  styleUrl: './manage-cars.component.css'
})

export class ManageCarsComponent implements OnInit {
  carForm!: FormGroup;
  carId!: number;
  car!: Car;

  constructor(
    private carService: ManageCarsService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.carId = Number(this.route.snapshot.paramMap.get('id')); // Ottieni l'ID dell'auto dalla route
    this.carService.getCarById(this.carId).subscribe((car) => {
      this.car = car;
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.carForm = this.formBuilder.group({
      brand: [this.car.brand, Validators.required],
      model: [this.car.model, Validators.required],
      license_plate: [this.car.license_plate, Validators.required],
      status: [this.car.status, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      this.carService.updateCar(this.carId, this.carForm.value).subscribe(() => {
        this.router.navigate(['/manage-cars'])

      });
    }
  }
}
