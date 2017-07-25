import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NightTimeService } from '../night-time/night-time.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  providers: [ NightTimeService ]
})
export class MainNavComponent implements OnInit {

  section:string;
  hideMenu:boolean = false;
  showMenu:boolean = true;
  isLoading:boolean = false;
  listStyle:boolean = false;
  chapter: number = 1;
  pageNumber: number = 1;

  constructor(private nightTime: NightTimeService,
              private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd ) {
        this.checkSection(event.url);
      }
    });
  }

  setNightTime() {
    this.nightTime.toggleNight();
  }

  checkSection(section) {
    let isReadingCheck = section.slice(0,9);
    if (isReadingCheck == '/chapter/') {
      this.hideMenu = true;
      this.section = 'chapter';
      this.toggleMenu();
      return false;
    }

    switch (section) {
      case 'all':
        this.section = 'all';
        break;
      case '/':
        this.section = 'recommended';
        break;
      default:
        this.section = 'recommended';
        break;
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

}
