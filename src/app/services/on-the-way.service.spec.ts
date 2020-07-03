import { TestBed, inject } from '@angular/core/testing';

import { Services\onTheWayService } from './services\on-the-way.service';

describe('Services\onTheWayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Services\onTheWayService]
    });
  });

  it('should be created', inject([Services\onTheWayService], (service: Services\onTheWayService) => {
    expect(service).toBeTruthy();
  }));
});
