import { Injectable } from '@angular/core';

@Injectable()
export class ViewerSettingsService {
  showMenu:boolean = false;
  whichManga: {};
  mangaTitle: '';
  chapter: 1;
  chapterPosition: 0;
  chaptersTotal: 0;
  chapterPagesTotal: 0;
  isPage: 1;
  isBookmark:boolean = false;
  hasBookmarks:boolean = false;
  hasNextBookmark:boolean = false;
  hasPrevBookmark:boolean = false;
  nextBookmark: {};
  prevBookmark: {};
  usingMagnifier:boolean = false;
  isReading:boolean = false;
  prevChapterShow:boolean = false;
  nextChapterShow:boolean = false;
  wasReading: {
    manga: {},
    chapter: 0,
    page: 0
  };

  constructor() { }

}
