/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovieRatingsService } from './movie-ratings.service';

describe('MovieRatingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieRatingsService]
    });
  });

  it('should ...', inject([MovieRatingsService], (service: MovieRatingsService) => {
    expect(service).toBeTruthy();
  }));
});
