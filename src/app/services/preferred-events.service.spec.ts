import { TestBed, inject } from '@angular/core/testing';

import { PreferredEventsService } from './preferred-events.service';

describe('PreferredEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreferredEventsService]
    });
  });

  it('should be created', inject([PreferredEventsService], (service: PreferredEventsService) => {
    expect(service).toBeTruthy();
  }));
});
