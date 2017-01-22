import { Injectable } from "@angular/core";
import { ApiService } from "../../core/services/api.service";
import { Observable } from "rxjs";
import { MovieDetail } from "../models/movie";

@Injectable()
export class MovieDetailService {

  constructor(private api : ApiService) { }

  getMovieDetail(id : number) : Observable<MovieDetail> {
    return this.api.get('/movies/' + id);
  }

}
