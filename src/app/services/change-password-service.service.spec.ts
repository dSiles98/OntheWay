import { TestBed, inject } from '@angular/core/testing';

import { ChangePasswordServiceService } from './change-password-service.service';

describe('ChangePasswordServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangePasswordServiceService]
    });
  });

  it('should be created', inject([ChangePasswordServiceService], (service: ChangePasswordServiceService) => {
    expect(service).toBeTruthy();
  }));
});
