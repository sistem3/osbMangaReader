import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { NightTimeService } from '../night-time/night-time.service';
import { MangaViewerService } from '../manga-viewer/manga-viewer.service';

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

  pageNumber: number;
  pageTotalNumber: number;
  chapterNumber: number;
  chapterTotalNumber: number;

  constructor(private nightTime: NightTimeService,
              private mangaViewer: MangaViewerService,
              private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd ) {
        this.checkSection(event.url);
      }
    });

    this.mangaViewer.viewerSettingStream$.subscribe(settings => {
      this.pageNumber = settings.page;
      this.pageTotalNumber = settings.pageTotal;
      this.chapterNumber = settings.chapter;
      this.chapterTotalNumber = settings.chapterTotal;
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
