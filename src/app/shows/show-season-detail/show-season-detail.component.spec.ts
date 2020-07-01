import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSeasonDetailComponent } from './show-season-detail.component';

describe('ShowSeasonDetailComponent', () => {
  let component: ShowSeasonDetailComponent;
  let fixture: ComponentFixture<ShowSeasonDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSeasonDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSeasonDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
