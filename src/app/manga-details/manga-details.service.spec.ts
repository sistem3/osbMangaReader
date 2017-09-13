import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { MangaDetailsService } from './manga-details.service';

describe('MangaDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MangaDetailsService,
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

  it('should ...', inject([MangaDetailsService], (service: MangaDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
