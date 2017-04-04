import { Component, OnInit, Input } from "@angular/core";
import { MovieDetail } from "../../models/movie";
import { MovieUsersService } from "../../services/movie-users.service";
import { User } from "../../../core/models/user";

@Component({
  selector: 'lijstr-movie-detail-table',
  templateUrl: './movie-detail-table.component.html',
  styleUrls: ['./movie-detail-table.component.css']
})
export class MovieDetailTableComponent {

  @Input() movie : MovieDetail;
  @Input() genres : boolean;
  @Input() languages : boolean;
  @Input() users : User[];

  constructor() {
    this.genres = true;
    this.languages = true;
  }

  getUserRepresentation() : any {
    let addedBy = this.movie.addedBy;
    if (this.users != null && addedBy != null) {
      for (let user of this.users) {
        if (user.id == addedBy) {
          return user.displayName;
        }
      }
    }
    return this.movie.addedBy;
  }

  getRuntime() : string {
    let runtime = this.movie.runtime;
    if (runtime == null) {
      return "N/A";
    }

    let hours = Math.floor(runtime / 60);
    let mins = runtime - (hours * 60);
    return hours + " uur & " + mins + " minuten (" + runtime + " mins)";
  }

}
