import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailSeasonsComponent } from './show-detail-seasons.component';

describe('ShowDetailSeasonsComponent', () => {
  let component: ShowDetailSeasonsComponent;
  let fixture: ComponentFixture<ShowDetailSeasonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDetailSeasonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailSeasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
