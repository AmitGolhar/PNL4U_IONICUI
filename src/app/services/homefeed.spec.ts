import { TestBed } from '@angular/core/testing';

import { Homefeed } from './homefeed';

describe('Homefeed', () => {
  let service: Homefeed;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Homefeed);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
