import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListPagerComponent } from './show-list-pager.component';

describe('ShowListPagerComponent', () => {
  let component: ShowListPagerComponent;
  let fixture: ComponentFixture<ShowListPagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowListPagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListPagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
