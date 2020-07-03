import { TestBed, inject } from '@angular/core/testing';

import { Services\categoriesService } from './services\categories.service';

describe('Services\categoriesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Services\categoriesService]
    });
  });

  it('should be created', inject([Services\categoriesService], (service: Services\categoriesService) => {
    expect(service).toBeTruthy();
  }));
});
