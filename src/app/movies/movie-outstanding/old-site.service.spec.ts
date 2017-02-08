/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OldSiteService } from './old-site.service';

describe('OldSiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OldSiteService]
    });
  });

  it('should ...', inject([OldSiteService], (service: OldSiteService) => {
    expect(service).toBeTruthy();
  }));
});
