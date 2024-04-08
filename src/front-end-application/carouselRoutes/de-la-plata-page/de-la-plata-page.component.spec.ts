import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeLaPlataPageComponent } from './de-la-plata-page.component';

describe('DeLaPlataPageComponent', () => {
  let component: DeLaPlataPageComponent;
  let fixture: ComponentFixture<DeLaPlataPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeLaPlataPageComponent]
    });
    fixture = TestBed.createComponent(DeLaPlataPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
