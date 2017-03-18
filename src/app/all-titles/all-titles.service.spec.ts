import { TestBed, inject } from '@angular/core/testing';

import { AllTitlesService } from './all-titles.service';

describe('AllTitlesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AllTitlesService]
    });
  });

  it('should ...', inject([AllTitlesService], (service: AllTitlesService) => {
    expect(service).toBeTruthy();
  }));
});
