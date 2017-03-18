import { TestBed, inject } from '@angular/core/testing';

import { ViewerSettingsService } from './viewer-settings.service';

describe('ViewerSettingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewerSettingsService]
    });
  });

  it('should ...', inject([ViewerSettingsService], (service: ViewerSettingsService) => {
    expect(service).toBeTruthy();
  }));
});
