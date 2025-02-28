import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Car } from '../interface/car.model.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:8080/admin/add-car';
  http = inject(HttpClient)

  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car);
  }
}
