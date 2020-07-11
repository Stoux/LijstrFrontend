import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { ShowSeasonDetail } from '../models/show';
import { ShowDetailService } from '../services/show-detail.service';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShowSeasonDetailResolverService implements Resolve<ShowSeasonDetail> {

  private cache: { [key: string]: ShowSeasonDetail } = {};

  constructor(private detailService: ShowDetailService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ShowSeasonDetail> {
    const showId = route.params.showId;
    const seasonNumber = route.params.seasonNumber;

    // Check if cached
    const cacheKey = `${showId}-${seasonNumber}`;
    if (this.cache.hasOwnProperty(cacheKey)) {
      const replay = new Subject<ShowSeasonDetail>();
      setTimeout(() => {
        replay.next(this.cache[cacheKey]);
        replay.complete();
      });
      return replay.asObservable();
    }

    const subject: Subject<ShowSeasonDetail> = new Subject();
    this.detailService.getSeasonDetail(showId, seasonNumber)
      .pipe(finalize(() => subject.complete()))
      .subscribe(
        season => {
          this.cache[cacheKey] = season;
          subject.next(season);
        },
        error => {
          this.router.navigate([`/shows/${showId}`]);
          subject.next(null);
        }
      );

    return subject.asObservable();
  }


}
