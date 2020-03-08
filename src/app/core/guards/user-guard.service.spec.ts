/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserGuard } from './user-guard.service';

describe('UserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserGuard]
    });
  });

  it('should ...', inject([UserGuard], (service: UserGuard) => {
    expect(service).toBeTruthy();
  }));
});
