import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { MovieDetail } from "../models/movie";
import { Observable, Subject } from "rxjs";
import { MovieDetailService } from "../services/movie-detail.service";
import { TargetDetailResolver } from "../../abs/detail/target-detail.service";

@Injectable()
export class MovieDetailResolver extends TargetDetailResolver<MovieDetail> {

  constructor(detailService : MovieDetailService,
              router : Router) {
    super(detailService, router, 'movies');
  }

}
