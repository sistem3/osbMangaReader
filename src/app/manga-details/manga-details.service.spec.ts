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

  it('should have a baseUrl', inject([MangaDetailsService], (service: MangaDetailsService) => {
    expect(service.baseUrl).toBeTruthy();
  }));

  it('should have a baseUrl that is https://doodle-manga-scraper.p.mashape.com/', inject([MangaDetailsService], (service: MangaDetailsService) => {
    expect(service.baseUrl).toBe('https://doodle-manga-scraper.p.mashape.com/');
  }));

  it('should have a apiKey', inject([MangaDetailsService], (service: MangaDetailsService) => {
    expect(service.apiKey).toBeTruthy();
  }));

  it('should have a apiKey that is xiQSdA9ACbmshUxnm4ZBC8nn2umSp1LeqQfjsnnVeMWHHSIQy0', inject([MangaDetailsService], (service: MangaDetailsService) => {
    expect(service.apiKey).toBe('xiQSdA9ACbmshUxnm4ZBC8nn2umSp1LeqQfjsnnVeMWHHSIQy0');
  }));

  it('should have a defaultSite', inject([MangaDetailsService], (service: MangaDetailsService) => {
    expect(service.defaultSite).toBeTruthy();
  }));

  it('should have a defaultSite that is mangareader.net', inject([MangaDetailsService], (service: MangaDetailsService) => {
    expect(service.defaultSite).toBe('mangareader.net');
  }));
});
