/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OldSiteSyncComponent } from './old-site-sync.component';

describe('OldSiteSyncComponent', () => {
  let component: OldSiteSyncComponent;
  let fixture: ComponentFixture<OldSiteSyncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OldSiteSyncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OldSiteSyncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
