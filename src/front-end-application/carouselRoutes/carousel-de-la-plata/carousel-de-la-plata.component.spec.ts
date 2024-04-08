import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselDeLaPlataComponent } from './carousel-de-la-plata.component';

describe('CarouselDeLaPlataComponent', () => {
  let component: CarouselDeLaPlataComponent;
  let fixture: ComponentFixture<CarouselDeLaPlataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselDeLaPlataComponent]
    });
    fixture = TestBed.createComponent(CarouselDeLaPlataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
