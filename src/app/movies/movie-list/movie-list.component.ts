import { Component, OnInit, OnDestroy } from "@angular/core";
import { MovieListService } from "../services/movie-list.service";
import { Subscription } from "rxjs";
import { MovieSummary } from "../models/movie";
import { LijstrException } from "../../core/exceptions";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'lijstr-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {

  selected = [];
  cache : MovieSummary[];
  summaries : MovieSummary[];
  error : LijstrException;

  private listSubscription : Subscription;

  constructor(public listService : MovieListService,
              private route: ActivatedRoute,
              private router : Router) {
  }

  ngOnInit() {
    this.listSubscription = this.listService.getSummaries().subscribe(
      list => {
        this.cache = list;
        this.summaries = list;
        this.error = null;
      },
      error => {
        this.error = error;
      }
    );
  }

  onSelect({ selected }) {
    this.router.navigate([selected[0].id], { relativeTo: this.route });
  }


  ngOnDestroy() : void {
    console.log('Destroy MovieList');
    this.listSubscription.unsubscribe();
    this.listSubscription = null;
  }

  onFilter(value) {
    this.summaries = this.cache.filter(function(d) {
      return d.title.toLowerCase().indexOf(value) !== -1 || !value;
    });
  }

}
