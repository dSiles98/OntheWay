import { TestBed, inject } from '@angular/core/testing';

import { UsersForEventsService } from './users-for-events.service';

describe('UsersForEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersForEventsService]
    });
  });

  it('should be created', inject([UsersForEventsService], (service: UsersForEventsService) => {
    expect(service).toBeTruthy();
  }));
});
