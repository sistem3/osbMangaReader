import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MangaDetailsService {

  baseUrl = 'https://doodle-manga-scraper.p.mashape.com/';
  apiKey = 'xiQSdA9ACbmshUxnm4ZBC8nn2umSp1LeqQfjsnnVeMWHHSIQy0';
  defaultSite = 'mangareader.net';
  cachedDetails = [];

  constructor(private http: Http) { }

  getDetails(manga) {
    let headers = new Headers({ 'X-Mashape-Authorization': this.apiKey });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.baseUrl + this.defaultSite + '/manga/' + manga, options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  checkCachedDetails(manga) {
    let cachedVersion = '';
    this.cachedDetails.forEach((item) => {
      if (item.href == manga) {
        cachedVersion = item;
      }
    });
    return cachedVersion;
  }

  getCachedDetails() {
    let cacheCheck = localStorage.getItem('osbMangaReader.mangaDetails');
    if (cacheCheck) {
      this.cachedDetails = JSON.parse(cacheCheck);
    }
  }

  cacheDetails(manga) {
    this.cachedDetails.push(manga);
    localStorage.setItem('osbMangaReader.mangaDetails', JSON.stringify(this.cachedDetails));
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
