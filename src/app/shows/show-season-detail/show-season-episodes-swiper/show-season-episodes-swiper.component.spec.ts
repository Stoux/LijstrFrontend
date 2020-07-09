import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSeasonEpisodesSwiperComponent } from './show-season-episodes-swiper.component';

describe('ShowSeasonEpisodesSwiperComponent', () => {
  let component: ShowSeasonEpisodesSwiperComponent;
  let fixture: ComponentFixture<ShowSeasonEpisodesSwiperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSeasonEpisodesSwiperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSeasonEpisodesSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
