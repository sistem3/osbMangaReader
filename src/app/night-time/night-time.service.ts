import { Injectable } from '@angular/core';

@Injectable()
export class NightTimeService {

  isNight:boolean = false;

  constructor() { }

  checkNight() {

  }

  setNight() {
    console.log('Setting night');
    this.isNight = !this.isNight;
    localStorage.setItem('osbMangaReader.isNight', JSON.stringify(this.isNight));
    if (this.isNight) {
      document.body.classList.add('night-time');
    } else {
      document.body.classList.remove('night-time');
    }
  }
}
