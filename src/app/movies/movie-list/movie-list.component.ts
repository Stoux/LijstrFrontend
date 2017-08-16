import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MovieSummary } from "../models/movie";
import { ActivatedRoute, Router } from "@angular/router";
import { ShortRating } from "../models/ratings";
import { DecimalPipe } from "@angular/common";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { ListPagerComponent, RowCaller } from "./list-pager/list-pager.component";
import {ListExtendedFilterComponent} from "./list-extended-filter/list-extended-filter.component";

@Component({
  selector: 'lijstr-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, RowCaller {

  @ViewChild('valueCell') valueCell : TemplateRef<any>;
  @ViewChild('imdbCell') imdbCell : TemplateRef<any>;
  @ViewChild('numberCell') numberCell : TemplateRef<any>;
  @ViewChild('userCell') userCell;
  @ViewChild('movieList') listTable : DatatableComponent;
  @ViewChild('pager') listPager : ListPagerComponent;
  @ViewChild('extendedFilter') extendedFilter : ListExtendedFilterComponent;

  settingsEditable : boolean;
  requiredColumns = [];
  availableColumns = [];

  columns = [];
  selected = [];
  summaries : MovieSummary[];

  showExtendedFilter : boolean;

  private numberPipe : DecimalPipe;

  constructor(private route : ActivatedRoute,
              private router : Router) {
    this.numberPipe = new DecimalPipe('en-US');
  }

  ngOnInit() {
    this.settingsEditable = false;
    this.showExtendedFilter = false;
    this.requiredColumns = [{name: "Titel", prop: "title", flexGrow: 4, cellTemplate: this.valueCell}];
    this.availableColumns = [
      {name: "Jaar", prop: "year", flexGrow: 1, cellTemplate: this.valueCell},
      {name: "IMDB", prop: "imdbRating", flexGrow: 1, cellTemplate: this.imdbCell},
      {name: "MC", prop: "metacriticScore", flexGrow: 1, cellTemplate: this.numberCell},
      {name: "Looptijd", prop: "runtime", flexGrow: 1, cellTemplate: this.numberCell}
    ];
  }

  onSelect({selected}) {
    this.router.navigate([selected[0].id], {relativeTo: this.route});
  }

  extendFilter() : void {
    this.showExtendedFilter = !this.showExtendedFilter;
    this.extendedFilter.setEnabled(this.showExtendedFilter);
  }

  onNewList(summaries : MovieSummary[]) {
    this.summaries = this.listPager.sort(summaries);
    this.summaries = this.extendedFilter.onNewList(summaries);
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

  goToRow(row : number) : void {
    const bodyComponent = this.listTable.bodyComponent;
    const offset = bodyComponent.rowHeightsCache.query(row - 1);
    bodyComponent.scroller.setOffset(offset);
  }

  onSort(event) {
    const sort = event.sorts[0];
    this.summaries = this.listPager.onSort(sort.prop, sort.dir, this.summaries);
  }

  getCaller() : RowCaller {
    return this;
  }

}
