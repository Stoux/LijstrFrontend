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
  summaries : MovieSummary[];
  error : LijstrException;

  private listSubscription : Subscription;

  constructor(public listService : MovieListService,
              private route: ActivatedRoute,
              private router : Router) {
  }

  ngOnInit() {
    console.log('Init MovieList');
    this.listSubscription = this.listService.getSummaries().subscribe(
      list => {
        console.log('Got a new List');
        this.summaries = list;
        this.error = null;
      },
      error => {
        console.log('Welp, something went wrong.');
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

}
