import { TestBed, inject } from '@angular/core/testing';

import { AdminEventsService } from './admin-events.service';

describe('AdminEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminEventsService]
    });
  });

  it('should be created', inject([AdminEventsService], (service: AdminEventsService) => {
    expect(service).toBeTruthy();
  }));
});
