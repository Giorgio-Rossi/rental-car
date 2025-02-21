import { Injectable } from '@angular/core';
import { Request } from '../interface/request.model.interface';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  requests: Request[] = [];

  constructor() {}

  addRequest(request: Request) {
    this.requests.push(request);
  }
}
