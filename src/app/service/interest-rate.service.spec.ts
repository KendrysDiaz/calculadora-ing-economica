import { TestBed } from '@angular/core/testing';

import { InterestRateService } from './interest-rate.service';

describe('InterestRateService', () => {
  let service: InterestRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterestRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
