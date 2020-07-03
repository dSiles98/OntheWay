import { TestBed, inject } from '@angular/core/testing';

import { ScheduleSiteServiceService } from './schedule-site-service.service';

describe('ScheduleSiteServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleSiteServiceService]
    });
  });

  it('should be created', inject([ScheduleSiteServiceService], (service: ScheduleSiteServiceService) => {
    expect(service).toBeTruthy();
  }));
});
