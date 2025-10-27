import { TestBed } from '@angular/core/testing';

import { Promoters } from './promoters';

describe('Promoters', () => {
  let service: Promoters;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Promoters);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
