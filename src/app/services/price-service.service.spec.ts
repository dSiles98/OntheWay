import { TestBed, inject } from '@angular/core/testing';

import { PriceServiceService } from './price-service.service';

describe('PriceServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceServiceService]
    });
  });

  it('should be created', inject([PriceServiceService], (service: PriceServiceService) => {
    expect(service).toBeTruthy();
  }));
});
