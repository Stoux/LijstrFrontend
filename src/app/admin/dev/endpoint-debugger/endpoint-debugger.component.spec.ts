import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndpointDebuggerComponent } from './endpoint-debugger.component';

describe('EndpointDebuggerComponent', () => {
  let component: EndpointDebuggerComponent;
  let fixture: ComponentFixture<EndpointDebuggerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndpointDebuggerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndpointDebuggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
