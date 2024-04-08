import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAccomadationComponent } from './create-accomadation.component';

describe('CreateAccomadationComponent', () => {
  let component: CreateAccomadationComponent;
  let fixture: ComponentFixture<CreateAccomadationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAccomadationComponent]
    });
    fixture = TestBed.createComponent(CreateAccomadationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
