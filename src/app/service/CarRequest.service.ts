import { inject, Injectable } from '@angular/core';
import { CarRequest } from '../interface/CarRequest.model.interface';
import { Observable } from 'rxjs/internal/Observable';
import { MOCK_CARS } from '../mock-data/mock-cars';
import { Car} from '../interface/car.model.interface';
import { of } from 'rxjs';
import { MOCK_REQUEST } from '../mock-data/mock-requests';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CarRequestService {
  requests: CarRequest[] = [];
  
  http=inject(HttpClient)

  private apiUrl = 'http://localhost:8080/api/car-request';  
  private apiUrlAllCarRequest = 'http://localhost:8080/api/car-requests/all-requests';  
  private apiUrlAdminManageRequest = 'http://localhost:8080/admin/manage-request'; 
  
  getRequests(): Observable<CarRequest[]> {
    return this.http.get<CarRequest[]>(`${this.apiUrlAllCarRequest}`);
  }
  
  createRequest(request: CarRequest): Observable<CarRequest> {
    request.created_at = new Date();
    request.updated_at = new Date();
    return this.http.post<CarRequest>(`${this.apiUrl}/create-request`, request);
  }


  updateRequestStatus(id: number, status: string): Observable<CarRequest> {
    return this.http.put<CarRequest>(`${this.apiUrlAdminManageRequest}/${id}`, { status });
  }

  canEditRequest(row: any): boolean {
    return row.status !== 'Annullata';
  }
}
