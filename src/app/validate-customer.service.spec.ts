import { TestBed } from '@angular/core/testing';

import { ValidateCustomerService } from './validate-customer.service';

describe('ValidateCustomerService', () => {
  let service: ValidateCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
