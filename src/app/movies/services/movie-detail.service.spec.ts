/* tslint:disable:no-unused-variable */
import { TestBed, inject } from "@angular/core/testing";
import { MovieDetailService } from "./movie-detail.service";

describe('MovieDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDetailService]
    });
  });

  it('should ...', inject([MovieDetailService], (service: MovieDetailService) => {
    expect(service).toBeTruthy();
  }));
});
