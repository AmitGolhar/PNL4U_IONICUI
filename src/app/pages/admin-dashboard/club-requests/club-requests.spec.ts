import { TestBed } from '@angular/core/testing';

import { ClubRequests } from './club-requests';

describe('ClubRequests', () => {
  let service: ClubRequests;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubRequests);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
