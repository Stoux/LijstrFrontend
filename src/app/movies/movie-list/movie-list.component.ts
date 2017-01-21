import { Component, OnInit } from '@angular/core';
import { MovieListService } from "../services/movie-list.service";
import { MovieSummary } from "../models/movie-summary";

@Component({
  selector: 'lijstr-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  summaries : MovieSummary[];

  constructor(public listService: MovieListService) { }

  ngOnInit() {
    //TODO: Use observable
    this.summaries = this.listService.getSummaries();
  }

}
