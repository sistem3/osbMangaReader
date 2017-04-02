import { Injectable } from '@angular/core';

@Injectable()
export class NightTimeService {

  isNight:boolean = false;

  constructor() { }

  checkNight() {
    console.log('Check night');
    document.body.classList.remove('night-time');
    let isNight = localStorage.getItem('osbMangaReader.isNight');
    if (isNight) {
      this.isNight = JSON.parse(isNight);
      //console.log(this.isNight);
      this.setNight();
    }
  }

  toggleNight() {
    //console.log(this.isNight);
    this.isNight = !this.isNight;
    //console.log(this.isNight);
    this.setNight();
  }

  setNight() {
    console.log('Setting night');
    //console.log(this.isNight);
    localStorage.setItem('osbMangaReader.isNight', JSON.stringify(this.isNight));
    if (this.isNight) {
      document.body.classList.add('night-time');
    } else {
      document.body.classList.remove('night-time');
    }
  }
}
