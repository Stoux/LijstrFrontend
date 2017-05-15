import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowListSettingsComponent } from './show-list-settings.component';

describe('ShowListSettingsComponent', () => {
  let component: ShowListSettingsComponent;
  let fixture: ComponentFixture<ShowListSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowListSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowListSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
