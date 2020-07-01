import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDetailTableComponent } from './show-detail-table.component';

describe('ShowDetailTableComponent', () => {
  let component: ShowDetailTableComponent;
  let fixture: ComponentFixture<ShowDetailTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowDetailTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
