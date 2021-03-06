import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { MovieDetail } from '../models/movie';
import { Observable, Subject } from 'rxjs';
import { MovieDetailService } from '../services/movie-detail.service';
import {finalize} from 'rxjs/operators';

@Injectable()
export class MovieDetailResolver implements Resolve<MovieDetail> {

  constructor(private detailService: MovieDetailService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<MovieDetail> {
    const id = route.params.id;
    const subject: Subject<MovieDetail> = new Subject();
    this.detailService.getMovieDetail(id)
      .pipe(finalize(() => subject.complete()))
      .subscribe(
      movie => {
        subject.next(movie);
      },
      error => {
        this.router.navigate(['/movies']);
        subject.next(null);
      }
    );

    return subject.asObservable();
  }
}
