import { TestBed, inject } from '@angular/core/testing';

import { ScheduleEventServiceService } from './schedule-event-service.service';

describe('ScheduleEventServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleEventServiceService]
    });
  });

  it('should be created', inject([ScheduleEventServiceService], (service: ScheduleEventServiceService) => {
    expect(service).toBeTruthy();
  }));
});
