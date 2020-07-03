import { TestBed, inject } from '@angular/core/testing';

import { ForgotMyPasswordService } from './forgot-my-password.service';

describe('ForgotMyPasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ForgotMyPasswordService]
    });
  });

  it('should be created', inject([ForgotMyPasswordService], (service: ForgotMyPasswordService) => {
    expect(service).toBeTruthy();
  }));
});
