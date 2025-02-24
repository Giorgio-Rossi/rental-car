import { Injectable } from '@angular/core';
import { MOCK_CARS } from '../mock-data/mock-cars';
import { Observable, of } from 'rxjs';
import { Car } from '../interface/car.model.interface';

@Injectable({
  providedIn: 'root'
})
export class ManageCarsService {

  constructor() { }

  getAllCars(): Observable<Car[]> {
    return of(MOCK_CARS);
  }

  getCarById(id: number): Observable<Car> {
    return of(MOCK_CARS.find(car => car.id === id) as Car);
  }

  updateCar(id: number, updatedCar: Partial<Car>): Observable<Car> {
    const carIndex = MOCK_CARS.findIndex(car => car.id === id);
    if (carIndex !== -1) {
      MOCK_CARS[carIndex] = { ...MOCK_CARS[carIndex], ...updatedCar };
    }
    return of(MOCK_CARS[carIndex]);
  }

    getAvailableCars(): Observable<Car[]> { 
      return of(MOCK_CARS.filter(car => car.status === 'Disponibile'));
    }
    
  
}
