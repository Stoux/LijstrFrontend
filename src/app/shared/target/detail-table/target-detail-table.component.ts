import { Component, OnInit, Input, OnChanges, SimpleChanges } from "@angular/core";
import { MovieDetail } from "../../../movies/models/movie";
import { MovieUsersService } from "../../../movies/services/movie-users.service";
import { User } from "../../../core/models/user";
import { TargetDetail } from "../../../abs/models/target";
import { ShortRating } from "../../models/ratings";
import { ShowDetail } from "../../../shows/models/show";
import { ShowStatus } from "../../../shows/models/show-season";

@Component({
  selector: 'lijstr-target-detail-table',
  templateUrl: './target-detail-table.component.html',
  styleUrls: ['./target-detail-table.component.css']
})
export class TargetDetailTableComponent implements OnChanges {

  @Input() movie : MovieDetail;
  @Input() show : ShowDetail;
  @Input() genres : boolean;
  @Input() languages : boolean;
  @Input() users : User[];

  target : TargetDetail<ShortRating>;
  isMovie : boolean;
  isShow : boolean;

  constructor() {
    this.genres = true;
    this.languages = true;
    this.isMovie = false;
    this.isShow = false;
  }

  ngOnChanges(changes : SimpleChanges) : void {
    //Mirror the change to the target
    if ('show' in changes) {
      this.target = this.show;
      this.isShow = true;
      this.isMovie = false;
    }
    if ('movie' in changes) {
      this.target = this.movie;
      this.isMovie = true;
      this.isShow = false;
    }
  }

  getUserRepresentation() : any {
    let addedBy = this.target.addedBy;
    if (this.users != null && addedBy != null) {
      for (let user of this.users) {
        if (user.id == addedBy) {
          return user.displayName;
        }
      }
    }
    return this.target.addedBy;
  }

  getRuntime() : string {
    let runtime = this.target.runtime;
    if (runtime == null) {
      return "N/A";
    }

    if (runtime < 60) {
      return runtime + " minuten";
    }

    let hours = Math.floor(runtime / 60);
    let mins = runtime - (hours * 60);
    return hours + " uur & " + mins + " minuten (" + runtime + " mins)";
  }

  getSeasons() : string {
    const seasons = this.show.seasons;
    let planned = 0;
    for (let season of seasons) {
      if (season.status == ShowStatus.PLANNED) {
        planned++;
      }
    }

    if (planned == 0) {
      return "" + seasons.length;
    } else {
      return (seasons.length - planned) + " (+ " + planned + " gepland)";
    }
  }

}
