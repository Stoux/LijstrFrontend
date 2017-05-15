import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListFilterComponent } from './show-list-filter.component';

describe('ShowListFilterComponent', () => {
  let component: ShowListFilterComponent;
  let fixture: ComponentFixture<ShowListFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowListFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
