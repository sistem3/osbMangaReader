import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { AllTitlesService } from './all-titles.service';

describe('AllTitlesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AllTitlesService,
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

  it('should ...', inject([AllTitlesService], (service: AllTitlesService) => {
    expect(service).toBeTruthy();
  }));
});
