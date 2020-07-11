import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSeasonTableComponent } from './show-season-table.component';

describe('ShowSeasonTableComponent', () => {
  let component: ShowSeasonTableComponent;
  let fixture: ComponentFixture<ShowSeasonTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowSeasonTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSeasonTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
