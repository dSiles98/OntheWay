import { TestBed, inject } from '@angular/core/testing';

import { ConfirmUserRegistrationService } from './confirm-user-registration.service';

describe('ConfirmUserRegistrationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmUserRegistrationService]
    });
  });

  it('should be created', inject([ConfirmUserRegistrationService], (service: ConfirmUserRegistrationService) => {
    expect(service).toBeTruthy();
  }));
});
