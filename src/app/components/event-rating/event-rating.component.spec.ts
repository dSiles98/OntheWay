import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRatingComponent } from './event-rating.component';

describe('EventRatingComponent', () => {
  let component: EventRatingComponent;
  let fixture: ComponentFixture<EventRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
