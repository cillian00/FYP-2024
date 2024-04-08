import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelSystemBarComponent } from './level-system-bar.component';

describe('LevelSystemBarComponent', () => {
  let component: LevelSystemBarComponent;
  let fixture: ComponentFixture<LevelSystemBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LevelSystemBarComponent]
    });
    fixture = TestBed.createComponent(LevelSystemBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
