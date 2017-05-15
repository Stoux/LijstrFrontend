import { TestBed, inject } from '@angular/core/testing';

import { ShowUsersService } from './show-users.service';

describe('ShowUsersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShowUsersService]
    });
  });

  it('should ...', inject([ShowUsersService], (service: ShowUsersService) => {
    expect(service).toBeTruthy();
  }));
});
