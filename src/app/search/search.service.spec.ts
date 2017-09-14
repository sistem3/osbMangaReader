import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { SearchService } from './search.service';

describe('SearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SearchService,
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

  it('should be created', inject([SearchService], (service: SearchService) => {
    expect(service).toBeTruthy();
  }));

  it('should have a baseUrl', inject([SearchService], (service: SearchService) => {
    expect(service.baseUrl).toBeTruthy();
  }));

  it('should have a baseUrl that is https://doodle-manga-scraper.p.mashape.com/', inject([SearchService], (service: SearchService) => {
    expect(service.baseUrl).toBe('https://doodle-manga-scraper.p.mashape.com/');
  }));

  it('should have a apiKey', inject([SearchService], (service: SearchService) => {
    expect(service.apiKey).toBeTruthy();
  }));

  it('should have a apiKey that is xiQSdA9ACbmshUxnm4ZBC8nn2umSp1LeqQfjsnnVeMWHHSIQy0', inject([SearchService], (service: SearchService) => {
    expect(service.apiKey).toBe('xiQSdA9ACbmshUxnm4ZBC8nn2umSp1LeqQfjsnnVeMWHHSIQy0');
  }));

  it('should have a defaultSite', inject([SearchService], (service: SearchService) => {
    expect(service.defaultSite).toBeTruthy();
  }));

  it('should have a defaultSite that is mangareader.net', inject([SearchService], (service: SearchService) => {
    expect(service.defaultSite).toBe('mangareader.net');
  }));
});
