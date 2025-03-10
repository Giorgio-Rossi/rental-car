import { inject, Injectable } from '@angular/core';
import { CarRequest } from '../interface/CarRequest.model.interface';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CarRequestService {
  requests: CarRequest[] = [];

  http = inject(HttpClient)

  private apiUrl = 'http://localhost:8080/customer';
  private apiUrlAllCarRequest = 'http://localhost:8080/api/car-requests/all-requests';
  private apiUrlAdminManageRequest = 'http://localhost:8080/admin/manage-request';
  private apiUrlRequest = 'http://localhost:8080/api/car-requests';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  }

  getRequests(): Observable<CarRequest[]> {
    return this.http.get<CarRequest[]>(this.apiUrlAllCarRequest, { headers: this.getHeaders() });
  }

  createRequest(request: CarRequest): Observable<CarRequest> {
    request.createdAt = new Date().toISOString();
    request.updatedAt = new Date().toISOString();
    return this.http.post<CarRequest>(
      `${this.apiUrl}/add-request`,
      request,
      { headers: this.getHeaders() }
    );
  }

  deleteRequest(id: number): Observable<CarRequest> {
    return this.http.delete<CarRequest>(
      `${this.apiUrlRequest}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  getRequestsByUserUsername(username: String): Observable<CarRequest[]> {
    const params = new HttpParams().set('username', username.toString());
    return this.http.get<CarRequest[]>(
      `${this.apiUrlRequest}/get-request-by-username`,
      {
        headers: this.getHeaders(),
        params: params
      }
    );
  }

  updateRequestStatus(id: number, status: string): Observable<CarRequest> {
    const backendStatus = status.toUpperCase().replace(' ', '_');
    const headers = this.getHeaders().set('Content-Type', 'application/json');
    return this.http.put<CarRequest>(
      `${this.apiUrlAdminManageRequest}/${id}`,
      { status: backendStatus },
      { headers: headers }
    );
  }

  updateRequest(request: CarRequest): Observable<CarRequest> {
    const headers = this.getHeaders().set('Content-Type', 'application/json');
    return this.http.put<CarRequest>(
      `${this.apiUrlRequest}/update-request/${request.id}`,
      request,
      { headers: headers }
    );
  }

  canEditRequest(row: any): boolean {
    return row.status !== 'Annullata';
  }

  getLastRequestId(): Observable<number> {
    return this.http.get<number>(`${this.apiUrlRequest}/last-request-id`,
      { headers: this.getHeaders() });
  }
}
