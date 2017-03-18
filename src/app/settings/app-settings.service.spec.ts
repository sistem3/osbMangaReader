import { TestBed, inject } from '@angular/core/testing';

import { AppSettingsService } from './app-settings.service';

describe('AppSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppSettingsService]
    });
  });

  it('should ...', inject([AppSettingsService], (service: AppSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
