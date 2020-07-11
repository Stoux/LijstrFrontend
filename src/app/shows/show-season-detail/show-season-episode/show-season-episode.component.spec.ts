import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSeasonEpisodeComponent } from './show-season-episode.component';

describe('ShowSeasonEpisodeComponent', () => {
  let component: ShowSeasonEpisodeComponent;
  let fixture: ComponentFixture<ShowSeasonEpisodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSeasonEpisodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSeasonEpisodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
