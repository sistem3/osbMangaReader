import { TestBed, inject } from '@angular/core/testing';

import { MangaViewerService } from './manga-viewer.service';

describe('MangaViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MangaViewerService]
    });
  });

  it('should ...', inject([MangaViewerService], (service: MangaViewerService) => {
    expect(service).toBeTruthy();
  }));
});
