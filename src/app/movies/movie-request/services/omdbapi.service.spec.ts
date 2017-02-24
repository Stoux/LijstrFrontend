/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OmdbApiService } from './omdbapi.service';

describe('OmdbApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OmdbApiService]
    });
  });

  it('should ...', inject([OmdbApiService], (service: OmdbApiService) => {
    expect(service).toBeTruthy();
  }));
});
