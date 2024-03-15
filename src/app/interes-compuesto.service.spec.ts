import { TestBed } from '@angular/core/testing';

import { InteresCompuestoService } from './interes-compuesto.service';

describe('InteresCompuestoService', () => {
  let service: InteresCompuestoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteresCompuestoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
