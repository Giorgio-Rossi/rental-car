import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Car } from '../interface/car.model.interface';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:8080/admin/add-car';
  private lastIdUrl = 'http://localhost:8080/admin/last-car-id';
  private apiCars = 'http://localhost:8080/api/cars/allcars';
  private apiUrlEditCars = 'http://localhost:8080/admin/edit-car';  
  private apiUrlDeleteCa = 'http://localhost:8080/api/cars';  

  http = inject(HttpClient)

  private getHeaders(): HttpHeaders{
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  }

  createCar(car: Car): Observable<Car> {
    return this.getLastId().pipe(
      switchMap((lastId) => {
        car.id = lastId + 1;
        car.updatedAt = new Date().toISOString(); 
        console.log('Create car request:', car);
        return this.http.post<Car>(this.apiUrl, car, { headers: this.getHeaders() });
      })
    );
  }

  updateCar(car: Car): Observable<Car>{
    return this.http.put<Car>(`${this.apiUrlEditCars}/${car.id}`, car, { headers: this.getHeaders() });
  }

  getLastId(): Observable<number>{
    return this.http.get<number>(this.lastIdUrl, { headers: this.getHeaders() });
  }

  deleteCar(id?: number): Observable<Car>{
    console.log('ID received:', id)
    return this.http.delete<Car>(`${this.apiUrlDeleteCa}/${id}`, { headers: this.getHeaders() });
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiCars, { headers: this.getHeaders() });
  }}
