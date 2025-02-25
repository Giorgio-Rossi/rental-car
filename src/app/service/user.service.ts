import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_USERS } from '../mock-data/mock-users';  
import { User } from '../interface/user.model.interface';  

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor() {}
  
  updateUser(user: User) {
    return console.log('Operazione di update', user)  }

  getUserById(arg0: number) {
    return console.log()
  }

  
  editUser(): Observable<User[]>{
    return of(MOCK_USERS); 
  }

  getUsers(): Observable<User[]> {
    return of(MOCK_USERS); 
  }
}
