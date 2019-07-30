import { TestBed, inject } from '@angular/core/testing';

import { AddtocartService } from './addtocart.service';

describe('AddtocartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddtocartService]
    });
  });

  it('should be created', inject([AddtocartService], (service: AddtocartService) => {
    expect(service).toBeTruthy();
  }));
});
