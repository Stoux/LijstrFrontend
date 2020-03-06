import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonFilterComponent } from './list-person-filter.component';

describe('ListPersonFilterComponent', () => {
  let component: ListPersonFilterComponent;
  let fixture: ComponentFixture<ListPersonFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPersonFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPersonFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
