import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ShowDetailService } from '../services/show-detail.service';
import { ShowDetail, ShowSeasonDetail } from '../models/show';

@Injectable({
  providedIn: 'root'
})
export class ShowDetailResolverService  implements Resolve<ShowDetail> {

  private cache: { [key: number]: ShowDetail } = {};

  constructor(private detailService: ShowDetailService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ShowDetail> {
    const showId = route.params.showId;

    if (this.cache.hasOwnProperty(showId)) {
      const replay = new Subject<ShowDetail>();
      setTimeout(() => {
        const show = this.cache[showId];
        replay.next(show);
        replay.complete();
      });

      return replay.asObservable();
    }

    const subject: Subject<ShowDetail> = new Subject();
    this.detailService.getShowDetail(showId)
      .pipe(finalize(() => subject.complete()))
      .subscribe(
        show => {
          this.cache[showId] = show;
          subject.next(show);
        },
        error => {
          this.router.navigate(['/shows']);
          subject.next(null);
        }
      );

    return subject.asObservable();
  }


}
