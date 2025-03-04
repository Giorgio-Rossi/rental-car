import { inject, Injectable } from '@angular/core';
import { CarRequest } from '../interface/CarRequest.model.interface';
import { Observable } from 'rxjs/internal/Observable';
import { MOCK_CARS } from '../mock-data/mock-cars';
import { Car} from '../interface/car.model.interface';
import { of } from 'rxjs';
import { MOCK_REQUEST } from '../mock-data/mock-requests';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CarRequestService {
  requests: CarRequest[] = [];
  
  http=inject(HttpClient)

  private apiUrl = 'http://localhost:8080/api/car-request';  
  private apiUrlAllCarRequest = 'http://localhost:8080/api/car-requests/all-requests';  
  private apiUrlAdminManageRequest = 'http://localhost:8080/admin/manage-request'; 
  private apiUrlRequest = 'http://localhost:8080/api/car-requests';

  getRequests(): Observable<CarRequest[]> {
    return this.http.get<CarRequest[]>(`${this.apiUrlAllCarRequest}`);
  }
  
  createRequest(request: CarRequest): Observable<CarRequest> {
    request.createdAt = new Date().toISOString();
    request.updatedAt = new Date().toISOString();
    return this.http.post<CarRequest>(`${this.apiUrl}/create-request`, request);
  }

  deleteRequest(id: number): Observable<CarRequest> {
    return this.http.delete<CarRequest>(`${this.apiUrlRequest}/${id}`);    
  }

  updateRequestStatus(id: number, status: string): Observable<CarRequest> {
    const backendStatus = status.toUpperCase().replace(' ', '_');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<CarRequest>(
        `${this.apiUrlAdminManageRequest}/${id}`, 
        { status: backendStatus },
        { headers: headers }
    );
  }

  updateRequest(request: CarRequest): Observable<CarRequest> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<CarRequest>(
      `${this.apiUrlRequest}/update-request/${request.id}`, 
      request, 
      { headers: headers }
    );
  }

  canEditRequest(row: any): boolean {
    return row.status !== 'Annullata';
  }

  
}
