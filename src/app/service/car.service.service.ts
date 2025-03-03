import { HttpClient } from '@angular/common/http';
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

  http = inject(HttpClient)

  createCar(car: Car): Observable<Car> {
    return this.getLastId().pipe(
      switchMap((lastId) => {
        car.id = lastId + 1;
        car.updatedAt = new Date().toISOString(); 
        console.log('Create car request:', car);
        return this.http.post<Car>(this.apiUrl, car);
      })
    );
  }

  getLastId(): Observable<number>{
    return this.http.get<number>(this.lastIdUrl);
  }

  deleteCar(id?: number): Observable<Car>{
    return this.http.delete<Car>(`${this.apiUrl}/${id}`);
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiCars);
  }}
