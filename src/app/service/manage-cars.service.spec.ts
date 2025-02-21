import { TestBed } from '@angular/core/testing';

import { ManageCarsService } from '../service/manage-cars.service';

describe('ManageCarsService', () => {
  let service: ManageCarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageCarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
