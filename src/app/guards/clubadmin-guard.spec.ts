import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { clubadminGuard } from './clubadmin-guard';

describe('clubadminGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => clubadminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
