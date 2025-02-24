import { TestBed } from '@angular/core/testing';

import { CarRequestService } from './CarRequest.service';

describe('RequestService', () => {
  let service: CarRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
