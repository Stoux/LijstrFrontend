import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieDetail } from "../models/movie";
import { environment } from "../../../environments/environment";

@Component({
  selector: 'lijstr-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movie : MovieDetail;
  shortPlot : boolean;

  constructor(private route : ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe(
      (data : {movieDetail : MovieDetail}) => {
        this.movie = data.movieDetail;
      }
    );
    this.shortPlot = true;
  }

  getPosterURL() : string {
    return "http" + (environment.endpointSSL ? "s" : "") + "://" + environment.endpoint +
      "/movies/" + this.movie.id + "/poster";
  }

  switchPlotSize() {
    this.shortPlot = !this.shortPlot;
  }


  get debug() {
    return JSON.stringify(this.movie, null, 2);
  }

}
