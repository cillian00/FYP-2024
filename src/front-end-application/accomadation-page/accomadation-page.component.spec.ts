import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomadationPageComponent } from './accomadation-page.component';

describe('AccomadationPageComponent', () => {
  let component: AccomadationPageComponent;
  let fixture: ComponentFixture<AccomadationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccomadationPageComponent]
    });
    fixture = TestBed.createComponent(AccomadationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
