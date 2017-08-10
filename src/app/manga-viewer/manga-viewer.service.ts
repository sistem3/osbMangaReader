import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MangaViewerService {

  baseUrl = 'https://doodle-manga-scraper.p.mashape.com/';
  apiKey = 'xiQSdA9ACbmshUxnm4ZBC8nn2umSp1LeqQfjsnnVeMWHHSIQy0';
  defaultSite = 'mangareader.net';

  pageNumber: number = 1;
  pageTotalNumber: number = 1;
  chapterNumber: number = 1;
  chapterTotalNumber: number = 1;

  private viewerSettings = new Subject<any>();

  viewerSettingStream$ = this.viewerSettings.asObservable();

  constructor(private http: Http) {
    let initialSettings = {
      page: this.pageNumber,
      pageTotal: this.pageTotalNumber,
      chapter: this.chapterNumber,
      chapterTotal: this.chapterTotalNumber
    };
    this.viewerSettings.next(initialSettings);
  }

  getChapter(manga, chapter) {
    let headers = new Headers({ 'X-Mashape-Authorization': this.apiKey });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseUrl + this.defaultSite + '/manga/' + manga + '/' + chapter, options)
      .map(this.extractData)
      .catch(this.handleError);
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
    // console.log(updatedSettings);
    this.viewerSettings.next(updatedSettings);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
