import { TestBed, inject } from '@angular/core/testing';

import { EventsInSiteServiceService } from './events-in-site-service.service';

describe('EventsInSiteServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsInSiteServiceService]
    });
  });

  it('should be created', inject([EventsInSiteServiceService], (service: EventsInSiteServiceService) => {
    expect(service).toBeTruthy();
  }));
});
