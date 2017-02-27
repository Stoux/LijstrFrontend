import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from "@angular/core";
import { MovieListService } from "../services/movie-list.service";
import { Subscription } from "rxjs";
import { MovieSummary } from "../models/movie";
import { LijstrException } from "../../core/exceptions";
import { Router, ActivatedRoute } from "@angular/router";
import { ShortRating } from "../models/ratings";
import { DecimalPipe } from "@angular/common";

@Component({
  selector: 'lijstr-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  @ViewChild('valueCell') valueCell : TemplateRef<any>;
  @ViewChild('imdbCell') imdbCell : TemplateRef<any>;
  @ViewChild('metacriticCell') metacriticCell : TemplateRef<any>;
  @ViewChild('userCell') userCell;

  settingsEditable : boolean;
  requiredColumns = [];
  availableColumns = [];

  columns = [];
  selected = [];
  summaries : MovieSummary[];

  private numberPipe : DecimalPipe;

  constructor(private route : ActivatedRoute,
              private router : Router) {
    this.numberPipe = new DecimalPipe('en-US');
  }

  ngOnInit() {
    this.settingsEditable = false;
    this.requiredColumns = [{name: "Titel", prop: "title", flexGrow: 4, cellTemplate: this.valueCell}];
    this.availableColumns = [
      {name: "Jaar", prop: "year", flexGrow: 1, cellTemplate: this.valueCell},
      {name: "IMDB", prop: "imdbRating", flexGrow: 1, cellTemplate: this.imdbCell},
      {name: "MC", prop: "metacriticScore", flexGrow: 1, cellTemplate: this.metacriticCell}
    ];
  }

  onSelect({selected}) {
    this.router.navigate([selected[0].id], {relativeTo: this.route});
  }

  onNewList(summaries : MovieSummary[]) {
    this.summaries = summaries;
  }

  setColumns(columns) {
    this.columns = columns;
  }

  setSettingsEditable(editable : boolean) {
    this.settingsEditable = editable;
  }

  representativeRating(rating : ShortRating) : string {
    if (!rating) {
      return "N/A";
    }

    switch (rating.seen) {
      case 0: //Yes
        if (rating.rating == null) {
          return "?";
        } else {
          return this.numberPipe.transform(rating.rating, '1.1-1');
        }

      case 1: //No
        return "Nee";

      default:
      case 2:
        return "Ja?";
    }
  }

}
