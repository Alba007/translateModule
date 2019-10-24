import { TestBed } from '@angular/core/testing';

import { TransitService } from './transit.service';

describe('TransitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransitService = TestBed.get(TransitService);
    expect(service).toBeTruthy();
  });
});
