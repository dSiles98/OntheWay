import { TestBed, inject } from '@angular/core/testing';

import { RecentEventsService } from './services/recent-events.service';

describe('RecentEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecentEventsService]
    });
  });

  it('should be created', inject([RecentEventsService], (service: RecentEventsService) => {
    expect(service).toBeTruthy();
  }));
});
