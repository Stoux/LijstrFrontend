import { TestBed } from '@angular/core/testing';

import { ShowDetailResolverService } from './show-detail-resolver.service';

describe('ShowDetailResolverService', () => {
  let service: ShowDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
