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

  it('should have a baseUrl', inject([MangaViewerService], (service: MangaViewerService) => {
    expect(service.baseUrl).toBeTruthy();
  }));

  it('should have a baseUrl that is https://doodle-manga-scraper.p.mashape.com/', inject([MangaViewerService], (service: MangaViewerService) => {
    expect(service.baseUrl).toBe('https://doodle-manga-scraper.p.mashape.com/');
  }));

  it('should have a apiKey', inject([MangaViewerService], (service: MangaViewerService) => {
    expect(service.apiKey).toBeTruthy();
  }));

  it('should have a apiKey that is xiQSdA9ACbmshUxnm4ZBC8nn2umSp1LeqQfjsnnVeMWHHSIQy0', inject([MangaViewerService], (service: MangaViewerService) => {
    expect(service.apiKey).toBe('xiQSdA9ACbmshUxnm4ZBC8nn2umSp1LeqQfjsnnVeMWHHSIQy0');
  }));

  it('should have a defaultSite', inject([MangaViewerService], (service: MangaViewerService) => {
    expect(service.defaultSite).toBeTruthy();
  }));

  it('should have a defaultSite that is mangareader.net', inject([MangaViewerService], (service: MangaViewerService) => {
    expect(service.defaultSite).toBe('mangareader.net');
  }));
});
