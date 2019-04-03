import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromePopupComponent } from './chrome-popup.component';

describe('ChromePopupComponent', () => {
  let component: ChromePopupComponent;
  let fixture: ComponentFixture<ChromePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChromePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChromePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
