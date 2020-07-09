import { Component, Input, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ShowSeasonDetail } from '../../models/show';

@Component({
  selector: 'lijstr-show-season-episodes-swiper',
  templateUrl: './show-season-episodes-swiper.component.html',
  styleUrls: ['./show-season-episodes-swiper.component.css']
})
export class ShowSeasonEpisodesSwiperComponent implements OnInit {

  @Input() season: ShowSeasonDetail;

  config: SwiperConfigInterface = {
    direction: 'horizontal',
    allowTouchMove: true,
    grabCursor: true,
    autoplay: false,
    centeredSlides: false,
    slidesPerView: 'auto',
    centerInsufficientSlides: false,
    slidesOffsetBefore: 200,
    // slidesOffsetAfter: 542,
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
  };

  constructor() {

  }

  ngOnInit(): void {
  }

  public getPosterURL(): string {
    const size = 'w500';
    return `https://image.tmdb.org/t/p/${size}${this.season.posterImage}`;
  }


}
