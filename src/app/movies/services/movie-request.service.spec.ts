/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovieRequestService } from './movie-request.service';

describe('MovieRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieRequestService]
    });
  });

  it('should ...', inject([MovieRequestService], (service: MovieRequestService) => {
    expect(service).toBeTruthy();
  }));
});
