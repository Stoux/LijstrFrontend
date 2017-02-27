/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovieStatsService } from './movie-stats.service';

describe('MovieStatsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieStatsService]
    });
  });

  it('should ...', inject([MovieStatsService], (service: MovieStatsService) => {
    expect(service).toBeTruthy();
  }));
});
