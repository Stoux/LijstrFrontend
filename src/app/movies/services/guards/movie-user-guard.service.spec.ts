/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovieUserGuard } from './movie-user-guard.service';

describe('MovieUserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieUserGuard]
    });
  });

  it('should ...', inject([MovieUserGuard], (service: MovieUserGuard) => {
    expect(service).toBeTruthy();
  }));
});
