import { TestBed } from '@angular/core/testing';

import { BaseUsersService } from './base-users.service';

describe('BaseUsersService', () => {
  let service: BaseUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
