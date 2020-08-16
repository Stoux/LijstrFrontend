import { TestBed } from '@angular/core/testing';

import { ShowUsersService } from './show-users.service';

describe('ShowUsersService', () => {
  let service: ShowUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
