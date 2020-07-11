import { Component, Input, OnInit } from '@angular/core';
import { ShowDetail, ShowSeasonDetail } from '../../models/show';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lijstr-show-detail-seasons',
  templateUrl: './show-detail-seasons.component.html',
  styleUrls: ['./show-detail-seasons.component.css']
})
export class ShowDetailSeasonsComponent implements OnInit {

  @Input() show: ShowDetail;

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
    console.log(event);
    const newRoute = season.specials ? [ 'specials' ] : [ 'seasons', season.seasonNumber ];
    this.router.navigate(newRoute, {
      relativeTo: this.route,
    });
  }

}
