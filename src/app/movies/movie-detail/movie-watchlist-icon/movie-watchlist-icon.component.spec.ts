/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MovieWatchlistIconComponent } from './movie-watchlist-icon.component';

describe('MovieWatchlistIconComponent', () => {
  let component: MovieWatchlistIconComponent;
  let fixture: ComponentFixture<MovieWatchlistIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieWatchlistIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieWatchlistIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
