import { Component, TemplateRef, ViewChild } from "@angular/core";
import { MovieSummary } from "../models/movie";
import { ActivatedRoute, Router } from "@angular/router";
import { ShortRating } from "../../shared/models/ratings";
import { AbstractListComponent } from "../../abs/list/list.components";
import { ListPagerComponent } from "./list-pager/list-pager.component";

@Component({
  selector: 'lijstr-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent extends AbstractListComponent<ShortRating, ListPagerComponent, MovieSummary> {

  @ViewChild('valueCell') valueCell : TemplateRef<any>;
  @ViewChild('imdbCell') imdbCell : TemplateRef<any>;
  @ViewChild('numberCell') numberCell : TemplateRef<any>;

  settingsEditable : boolean;

  constructor(route : ActivatedRoute, router : Router) {
    super(route, router);
  }

  ngOnInit() : void {
    this.settingsEditable = false;
    super.ngOnInit();
  }

  protected getRequiredColumns() : any[] {
    return [{name: "Titel", prop: "title", flexGrow: 4, cellTemplate: this.valueCell}];
  }

  protected getAvailableColumns() : any[] {
    return [
      {name: "Jaar", prop: "year", flexGrow: 1, cellTemplate: this.valueCell},
      {name: "IMDB", prop: "imdbRating", flexGrow: 1, cellTemplate: this.imdbCell},
      {name: "MC", prop: "metacriticScore", flexGrow: 1, cellTemplate: this.numberCell},
      {name: "Looptijd", prop: "runtime", flexGrow: 1, cellTemplate: this.numberCell}
    ];
  }

  setSettingsEditable(editable : boolean) {
    this.settingsEditable = editable;
  }

}
