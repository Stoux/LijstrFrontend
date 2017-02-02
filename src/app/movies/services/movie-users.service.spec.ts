/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MovieUsersService } from './movie-users.service';

describe('MovieUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieUsersService]
    });
  });

  it('should ...', inject([MovieUsersService], (service: MovieUsersService) => {
    expect(service).toBeTruthy();
  }));
});
