import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { influencerGuard } from './influencer-guard';

describe('influencerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => influencerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
