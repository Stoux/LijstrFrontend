import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ShowDetailService } from '../services/show-detail.service';
import { ShowDetail } from '../models/show';

@Injectable({
  providedIn: 'root'
})
export class ShowDetailResolverService  implements Resolve<ShowDetail> {

  constructor(private detailService: ShowDetailService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ShowDetail> {
    const id = route.params.id;
    const subject: Subject<ShowDetail> = new Subject();
    this.detailService.getShowDetail(id)
      .pipe(finalize(() => subject.complete()))
      .subscribe(
        show => {
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
