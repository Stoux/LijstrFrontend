import { TestBed } from '@angular/core/testing';

import { MovieCollectionsService } from './movie-collections.service';

describe('MovieCollectionsService', () => {
  let service: MovieCollectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieCollectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
