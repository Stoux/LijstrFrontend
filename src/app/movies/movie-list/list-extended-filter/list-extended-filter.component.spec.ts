import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExtendedFilterComponent } from './list-extended-filter.component';

describe('ListExtendedFilterComponent', () => {
  let component: ListExtendedFilterComponent;
  let fixture: ComponentFixture<ListExtendedFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExtendedFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExtendedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
