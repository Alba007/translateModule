/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StateManagementService } from './state-management.service';

describe('Service: StateManagement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StateManagementService]
    });
  });

  it('should ...', inject([StateManagementService], (service: StateManagementService) => {
    expect(service).toBeTruthy();
  }));
});
