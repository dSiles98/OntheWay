import { TestBed, inject } from '@angular/core/testing';

import { CalendarSiteService } from './calendar-site.service';

describe('CalendarSiteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarSiteService]
    });
  });

  it('should be created', inject([CalendarSiteService], (service: CalendarSiteService) => {
    expect(service).toBeTruthy();
  }));
});
