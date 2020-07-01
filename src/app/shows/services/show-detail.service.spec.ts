import { TestBed } from '@angular/core/testing';

import { ShowDetailService } from './show-detail.service';

describe('ShowDetailService', () => {
  let service: ShowDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
