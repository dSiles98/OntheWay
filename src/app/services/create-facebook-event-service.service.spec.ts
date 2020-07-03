import { TestBed, inject } from '@angular/core/testing';

import { CreateFacebookEventServiceService } from './create-facebook-event-service.service';

describe('CreateFacebookEventServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateFacebookEventServiceService]
    });
  });

  it('should be created', inject([CreateFacebookEventServiceService], (service: CreateFacebookEventServiceService) => {
    expect(service).toBeTruthy();
  }));
});
