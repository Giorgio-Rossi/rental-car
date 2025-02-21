import { Component } from '@angular/core';
import { FormsModule } from  '@angular/forms';
 
@Component({
  selector: 'app-add-car',
  imports: [FormsModule],
  templateUrl: './add-car.component.html',
  styleUrl: './add-car.component.css'
})
export class AddCarComponent {
  car = {
    brand: '',
    model: '',
    license_plate: null,
    status: 'Disponibile'
  };

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
