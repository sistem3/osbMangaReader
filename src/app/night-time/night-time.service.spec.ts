import { TestBed, inject } from '@angular/core/testing';

import { NightTimeService } from './night-time.service';

describe('NightTimeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NightTimeService]
    });
  });

  it('should ...', inject([NightTimeService], (service: NightTimeService) => {
    expect(service).toBeTruthy();
  }));
});
