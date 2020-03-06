import { TestBed } from '@angular/core/testing';

import { MoviePeopleService } from './movie-people.service';

describe('MoviePeopleService', () => {
  let service: MoviePeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoviePeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
