import { TestBed, inject } from '@angular/core/testing';

import { ShowDetailResolver } from './show-detail-resolver';

describe('ShowDetailResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowDetailResolver]
    });
  });

  it('should ...', inject([ShowDetailResolver], (service: ShowDetailResolver) => {
    expect(service).toBeTruthy();
  }));
});
