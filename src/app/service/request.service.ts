import { Injectable } from '@angular/core';
import { Request } from '../interface/request.model.interface';
import { Observable } from 'rxjs/internal/Observable';
import { MOCK_CARS } from '../mock-data/mock-cars';
import { Car } from '../interface/car.model.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  requests: Request[] = [];

  constructor() {}

  getAvailableCars(): Observable<Car[]> { 
    return new Observable((observer) => {
      const availableCars = MOCK_CARS.filter(car => car.status === 'Disponibile');
      observer.next(availableCars);
      observer.complete();
    });
  }

  // Metodo per creare una nuova richiesta
  createRequest(request: Request): Observable<Request> {
    return new Observable((observer) => {
      request.created_at = new Date();
      request.updated_at = new Date();
      observer.next(request);
      observer.complete();
    })
    
  }
}
