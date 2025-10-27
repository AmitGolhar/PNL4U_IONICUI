import { TestBed } from '@angular/core/testing';

import { AiSmart } from './ai-smart';

describe('AiSmart', () => {
  let service: AiSmart;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiSmart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
