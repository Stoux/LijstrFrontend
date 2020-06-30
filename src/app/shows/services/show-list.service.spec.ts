import { TestBed } from '@angular/core/testing';

import { ShowListService } from './show-list.service';

describe('ShowListService', () => {
  let service: ShowListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
