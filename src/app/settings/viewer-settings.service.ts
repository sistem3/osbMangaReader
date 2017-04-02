import { Injectable } from '@angular/core';

@Injectable()
export class ViewerSettingsService {
  prevChapterShow:boolean = false;
  nextChapterShow:boolean = false;
  wasReading: {
    manga: {},
    chapter: 0,
    page: 0
  };

  constructor() {}
}
