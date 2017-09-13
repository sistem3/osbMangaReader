import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { MangaViewerService } from './manga-viewer.service';

describe('MangaViewerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MangaViewerService,
        {
          provide: Http, useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
          return new Http(backend, defaultOptions);
        }, deps: [MockBackend, BaseRequestOptions]
        },
        { provide: MockBackend, useClass: MockBackend },
        { provide: BaseRequestOptions, useClass: BaseRequestOptions }
      ]
    });
  });

  it('should ...', inject([MangaViewerService], (service: MangaViewerService) => {
    expect(service).toBeTruthy();
  }));
});
