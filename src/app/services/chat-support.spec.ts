import { TestBed } from '@angular/core/testing';

import { ChatSupport } from './chat-support';

describe('ChatSupport', () => {
  let service: ChatSupport;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatSupport);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
