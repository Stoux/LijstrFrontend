/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovieOutstandingService } from './movie-outstanding.service';

describe('MovieOutstandingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieOutstandingService]
    });
  });

  it('should ...', inject([MovieOutstandingService], (service: MovieOutstandingService) => {
    expect(service).toBeTruthy();
  }));
});
