import { TestBed, inject } from '@angular/core/testing';

import { MainNavService } from './main-nav.service';

describe('MainNavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainNavService]
    });
  });

  it('should be created', inject([MainNavService], (service: MainNavService) => {
    expect(service).toBeTruthy();
  }));
});
