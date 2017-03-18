import { TestBed, inject } from '@angular/core/testing';

import { MangaDetailsService } from './manga-details.service';

describe('MangaDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MangaDetailsService]
    });
  });

  it('should ...', inject([MangaDetailsService], (service: MangaDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
