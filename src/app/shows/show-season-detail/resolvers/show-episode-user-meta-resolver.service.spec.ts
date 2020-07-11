import { TestBed } from '@angular/core/testing';

import { ShowEpisodeUserMetaResolver } from './show-episode-user-meta-resolver.service';

describe('ShowEpisodeUserMetaResolverService', () => {
  let service: ShowEpisodeUserMetaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowEpisodeUserMetaResolver);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
