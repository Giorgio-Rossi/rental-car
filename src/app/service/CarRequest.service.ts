import { Injectable } from '@angular/core';
import { CarRequest } from '../interface/CarRequest.model.interface';
import { Observable } from 'rxjs/internal/Observable';
import { MOCK_CARS } from '../mock-data/mock-cars';
import { Car} from '../interface/car.model.interface';
import { of } from 'rxjs';
import { MOCK_REQUEST } from '../mock-data/mock-requests';

@Injectable({
  providedIn: 'root'
})

export class CarRequestService {
  requests: CarRequest[] = [];

  constructor() {}

  getRequests(): Observable<CarRequest[]> {
    return of(MOCK_REQUEST);  
  }

  createRequest(request: CarRequest): Observable<CarRequest> {
    request.created_at = new Date();
    request.updated_at = new Date();
    return of(request); 
  }

  updateRequestStatus(id: number, status: string): Observable<CarRequest> {
    const request = MOCK_REQUEST.find(r => r.id === id);  
    if (request) {
      request.status = status;
    }
    return of(request!);  
  }
}
