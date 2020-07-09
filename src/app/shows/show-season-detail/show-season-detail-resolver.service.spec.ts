import { TestBed } from '@angular/core/testing';

import { ShowSeasonDetailResolverService } from './show-season-detail-resolver.service';

describe('ShowSeasonDetailResolverService', () => {
  let service: ShowSeasonDetailResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowSeasonDetailResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
