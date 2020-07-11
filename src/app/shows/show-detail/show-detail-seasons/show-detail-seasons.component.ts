import { Component, Input, OnInit } from '@angular/core';
import { ShowDetail, ShowSeasonDetail } from '../../models/show';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ActivatedRoute, Router } from '@angular/router';
import { SeenMap } from '../../services/show-seen-status.service';

@Component({
  selector: 'lijstr-show-detail-seasons',
  templateUrl: './show-detail-seasons.component.html',
  styleUrls: ['./show-detail-seasons.component.css']
})
export class ShowDetailSeasonsComponent implements OnInit {

  @Input() show: ShowDetail;
  @Input() seenStatus: SeenMap | null;

  config: SwiperConfigInterface = {
    direction: 'horizontal',
    allowTouchMove: true,
    grabCursor: true,
    autoplay: false,
    centeredSlides: false,
    slidesPerView: 'auto',
    centerInsufficientSlides: false,
    slidesOffsetBefore: 542,
    slidesOffsetAfter: 542,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
  };

  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
  }

  toSeason(event: Event, season: ShowSeasonDetail) {
    event.preventDefault();
    const newRoute = season.specials ? [ 'specials' ] : [ 'seasons', season.seasonNumber ];
    this.router.navigate(newRoute, {
      relativeTo: this.route,
    });
  }

  getSeenPercentage(season: ShowSeasonDetail) {
    if (!this.seenStatus || !this.seenStatus.hasOwnProperty(season.id)) {
      return 0.0;
    }

    const seasonSeenStatus = Object.values(this.seenStatus[season.id]);
    const total = seasonSeenStatus.length;
    const seen = seasonSeenStatus.filter(value => value === true).length;

    if (total === 0 || seen === 0) {
      return 0.0;
    }

    return seen / (total / 100.0);
  }

}
