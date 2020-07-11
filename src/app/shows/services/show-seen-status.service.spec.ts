import { TestBed } from '@angular/core/testing';

import { ShowSeenStatusService } from './show-seen-status.service';

describe('ShowSeenStatusService', () => {
  let service: ShowSeenStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowSeenStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
