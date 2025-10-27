import { TestBed } from '@angular/core/testing';

import { AdminCms } from './admin-cms';

describe('AdminCms', () => {
  let service: AdminCms;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminCms);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
