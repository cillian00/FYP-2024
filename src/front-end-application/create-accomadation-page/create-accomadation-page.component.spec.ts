import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccomadationPageComponent } from './create-accomadation-page.component';

describe('CreateAccomadationPageComponent', () => {
  let component: CreateAccomadationPageComponent;
  let fixture: ComponentFixture<CreateAccomadationPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAccomadationPageComponent]
    });
    fixture = TestBed.createComponent(CreateAccomadationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
