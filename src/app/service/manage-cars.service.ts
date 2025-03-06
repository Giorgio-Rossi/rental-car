import { inject, Injectable } from '@angular/core';
import { MOCK_CARS } from '../mock-data/mock-cars';
import { Observable, of } from 'rxjs';
import { Car } from '../interface/car.model.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageCarsService {
  private apiUrl = 'http://localhost:8080/api/cars';
  private apiUrlAllCars = 'http://localhost:8080/api/cars/allcars';

  http = inject(HttpClient)

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  }


  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrlAllCars, { headers: this.getHeaders() });
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }


  updateCar(id: number, updatedCar: Partial<Car>): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, updatedCar, { headers: this.getHeaders() });
  }

  getAvailableCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/available-cars`, { headers: this.getHeaders() });
  }

}
