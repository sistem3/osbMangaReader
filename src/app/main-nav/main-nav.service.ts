import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MainNavService {

  pageNumber: number = 1;
  pageTotalNumber: number = 1;
  chapterNumber: number = 1;
  chapterTotalNumber: number = 1;

  private listType = new Subject<boolean>();
  private viewerSettings = new Subject<any>();

  listTypeStream$ = this.listType.asObservable();
  viewerSettingStream$ = this.viewerSettings.asObservable();

  constructor() {
    let initialSettings = {
      page: this.pageNumber,
      pageTotal: this.pageTotalNumber,
      chapter: this.chapterNumber,
      chapterTotal: this.chapterTotalNumber
    };
    this.viewerSettings.next(initialSettings);
    this.listType.next(false);
  }

  updateListType(value:boolean) {
    this.listType.next(value);
  }

  updateViewerDetails(type: string, value: number) {
    switch(type) {
      case 'page':
        this.pageNumber = value;
        break;
      case 'pageTotal':
        this.pageTotalNumber = value;
        break;
      case 'chapter':
        this.chapterNumber = value;
        break;
      case 'chapterTotal':
        this.chapterTotalNumber = value;
        break;
    }
    let updatedSettings = {
      page: this.pageNumber,
      pageTotal: this.pageTotalNumber,
      chapter: this.chapterNumber,
      chapterTotal: this.chapterTotalNumber
    };
    this.viewerSettings.next(updatedSettings);
  }

}
