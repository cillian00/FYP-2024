import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModernCardComponent } from './modern-card.component';

describe('ModernCardComponent', () => {
  let component: ModernCardComponent;
  let fixture: ComponentFixture<ModernCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModernCardComponent]
    });
    fixture = TestBed.createComponent(ModernCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
