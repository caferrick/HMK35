import { TestBed } from '@angular/core/testing';

import { VitalsService } from './vitals.service';

describe('VitalsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VitalsService = TestBed.get(VitalsService);
    expect(service).toBeTruthy();
  });
});
