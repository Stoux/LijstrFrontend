import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowDetail, ShowSeasonDetail } from '../models/show';
import { SeenMap, ShowSeenStatusService } from '../services/show-seen-status.service';
import { UserService } from '../../core/services/user.service';
import { User } from '../../core/models/user';

@Component({
  selector: 'lijstr-show-season-detail',
  templateUrl: './show-season-detail.component.html',
  styleUrls: ['./show-season-detail.component.scss']
})
export class ShowSeasonDetailComponent implements OnInit {

  public show: ShowDetail;
  public season: ShowSeasonDetail;

  public seenMap: SeenMap;
  public showingEpisode = false;

  public isShowUser: boolean;
  public users: User[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private seenStatusService: ShowSeenStatusService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: {show: ShowDetail, season: ShowSeasonDetail, users: User[]}) => {
        this.show = data.show;
        this.season = data.season;
        this.users = data.users;
        this.seenStatusService.getSeenStatus(this.show.id).subscribe(value => this.seenMap = value);
      }
    );
    this.isShowUser = this.userService.isShowUser();
  }

  public getPosterURL(): string {
    const size = 'w500';
    return `https://image.tmdb.org/t/p/${size}${this.season.posterImage}`;
  }

  public backToShow(event?: MouseEvent): void {
    if (event !== undefined) {
      event.preventDefault();
    }

    this.router.navigate(['shows', this.show.id]);
  }

  public backToSeason(event?: MouseEvent) {
    if (event !== undefined) {
      event.preventDefault();
    }

    this.router.navigate([ '.' ], {
      relativeTo: this.route,
    });
  }


}
