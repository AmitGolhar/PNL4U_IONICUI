import { TestBed } from '@angular/core/testing';

import { OffersWallet } from './offers-wallet';

describe('OffersWallet', () => {
  let service: OffersWallet;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OffersWallet);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
