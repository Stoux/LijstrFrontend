import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractListComponent } from "../../abs/list/list.components";
import { ActivatedRoute, Router } from "@angular/router";
import { ShortRating } from "../../shared/models/ratings";
import { ShowListPagerComponent } from "./show-list-pager/show-list-pager.component";
import { ShowSummary } from "../models/show";

@Component({
  selector: 'lijstr-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css']
})
export class ShowListComponent extends AbstractListComponent<ShortRating, ShowListPagerComponent, ShowSummary> {

  @ViewChild('valueCell') valueCell : TemplateRef<any>;
  @ViewChild('imdbCell') imdbCell : TemplateRef<any>;
  @ViewChild('numberCell') numberCell : TemplateRef<any>;

  constructor(route : ActivatedRoute, router : Router) {
    super(route, router);
  }


  protected getRequiredColumns() : any[] {
    return [{name: "Titel", prop: "title", flexGrow: 4, cellTemplate: this.valueCell}];
  }

  protected getAvailableColumns() : any[] {
    return [
      {name: "IMDB", prop: "imdbRating", flexGrow: 1, cellTemplate: this.imdbCell}
    ];
  }
}
