import { Injectable } from '@angular/core';

@Injectable()
export class NightTimeService {

  isNight:boolean;

  constructor() {
    this.checkNight();
  }

  checkNight() {
    document.body.classList.remove('night-time');
    let isNight = localStorage.getItem('osbMangaReader.isNight');
    if (isNight) {
      this.isNight = JSON.parse(isNight);
      this.setNight(this.isNight);
    } else {
      this.isNight = false;
    }
  }

  toggleNight() {
    this.isNight = !this.isNight;
    localStorage.setItem('osbMangaReader.isNight', JSON.stringify(this.isNight));
    this.setNight(this.isNight);
  }

  setNight(isNight) {
    if (isNight) {
      document.body.classList.add('night-time');
    } else {
      document.body.classList.remove('night-time');
    }
  }
}
