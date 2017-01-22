import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { MovieDetail } from "../models/movie";

@Component({
  selector: 'lijstr-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movie : MovieDetail;

  constructor(private route : ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      (data : {movieDetail : MovieDetail}) => {
        this.movie = data.movieDetail;
      }
    );
  }

  get debug() {
    return JSON.stringify(this.movie, null, 2);
  }

}
