import { TestBed, inject } from '@angular/core/testing';

import { PricesSiteServiceService } from './prices-site-service.service';

describe('PricesSiteServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PricesSiteServiceService]
    });
  });

  it('should be created', inject([PricesSiteServiceService], (service: PricesSiteServiceService) => {
    expect(service).toBeTruthy();
  }));
});
