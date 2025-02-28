import { inject, Injectable } from '@angular/core';
import { MOCK_CARS } from '../mock-data/mock-cars';
import { Observable, of } from 'rxjs';
import { Car } from '../interface/car.model.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageCarsService {
  private apiUrl = 'http://localhost:8080/api/cars';  
  private apiUrlAllCars = 'http://localhost:8080/api/cars/allcars';  


  http = inject(HttpClient)

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrlAllCars);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }
  

  updateCar(id: number, updatedCar: Partial<Car>): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, updatedCar);
  }
  
  getAvailableCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/Disponibile`);
  }
  
}
