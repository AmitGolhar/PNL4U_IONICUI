import { TestBed } from '@angular/core/testing';

import { QrCheckin } from './qr-checkin';

describe('QrCheckin', () => {
  let service: QrCheckin;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QrCheckin);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
