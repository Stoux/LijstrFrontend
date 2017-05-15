import { Component } from "@angular/core";
import { MovieUsersService } from "../../services/movie-users.service";
import { AbstractListSettings, OrderedColumn } from "../../../abs/list/settings/list-settings.component";

@Component({
  selector: 'lijstr-movie-list-settings',
  templateUrl: './../../../abs/list/settings/list-settings.component.html',
  styleUrls: ['./../../../abs/list/settings/list-settings.component.css']
})
export class MovieListSettingsComponent extends AbstractListSettings<MovieUsersService> {

  constructor(targetUsersService : MovieUsersService) {
    super(
      targetUsersService,
      'movies',
      [new OrderedColumn("year", null, true), new OrderedColumn("imdbRating", null, true)]
    );
  }

}
