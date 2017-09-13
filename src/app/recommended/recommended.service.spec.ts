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
});
