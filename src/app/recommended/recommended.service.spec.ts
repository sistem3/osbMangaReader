import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { RecommendedService } from './recommended.service';

describe('RecommendedService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecommendedService,
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

  it('should ...', inject([RecommendedService], (service: RecommendedService) => {
    expect(service).toBeTruthy();
  }));

  it('should have a baseUrl', inject([RecommendedService], (service: RecommendedService) => {
    expect(service.baseUrl).toBeTruthy();
  }));

  it('should have a baseUrl that is https://private-e00abd-osbmangareader.apiary-mock.com/topfeed', inject([RecommendedService], (service: RecommendedService) => {
    expect(service.baseUrl).toBe('https://private-e00abd-osbmangareader.apiary-mock.com/topfeed');
  }));
});
