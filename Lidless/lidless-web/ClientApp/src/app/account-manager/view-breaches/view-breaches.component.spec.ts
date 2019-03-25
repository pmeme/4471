import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBreachesComponent } from './view-breaches.component';

describe('ViewBreachesComponent', () => {
  let component: ViewBreachesComponent;
  let fixture: ComponentFixture<ViewBreachesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBreachesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBreachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
