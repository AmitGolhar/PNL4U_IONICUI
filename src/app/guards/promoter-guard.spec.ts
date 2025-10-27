import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { promoterGuard } from './promoter-guard';

describe('promoterGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => promoterGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
