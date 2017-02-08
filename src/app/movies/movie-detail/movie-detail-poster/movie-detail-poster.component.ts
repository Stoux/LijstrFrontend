import { Component, OnInit, Input } from '@angular/core';
import { MovieDetail } from "../../models/movie";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'lijstr-movie-detail-poster',
  templateUrl: './movie-detail-poster.component.html',
  styleUrls: ['./movie-detail-poster.component.css']
})
export class MovieDetailPosterComponent {

  @Input() movie : MovieDetail;

  constructor() { }

  getPosterURL() : string {
    return "http" + (environment.endpointSSL ? "s" : "") + "://" + environment.endpoint +
      "/movies/" + this.movie.id + "/poster";
  }

}
