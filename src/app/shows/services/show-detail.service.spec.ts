import { TestBed, inject } from '@angular/core/testing';

import { ShowDetailService } from './show-detail.service';

describe('ShowDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowDetailService]
    });
  });

  it('should ...', inject([ShowDetailService], (service: ShowDetailService) => {
    expect(service).toBeTruthy();
  }));
});
