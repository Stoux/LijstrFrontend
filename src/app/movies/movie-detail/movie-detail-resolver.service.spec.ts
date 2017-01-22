/* tslint:disable:no-unused-variable */
import { TestBed, inject } from "@angular/core/testing";
import { MovieDetailResolver } from "./movie-detail-resolver.service";

describe('MovieDetailResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovieDetailResolver]
    });
  });

  it('should ...', inject([MovieDetailResolver], (service: MovieDetailResolver) => {
    expect(service).toBeTruthy();
  }));
});
