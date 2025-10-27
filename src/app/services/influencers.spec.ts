import { TestBed } from '@angular/core/testing';

import { Influencers } from './influencers';

describe('Influencers', () => {
  let service: Influencers;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Influencers);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
