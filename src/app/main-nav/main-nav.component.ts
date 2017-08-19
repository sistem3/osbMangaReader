import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MainNavService } from './main-nav.service';
import { NightTimeService } from '../night-time/night-time.service';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  providers: [ NightTimeService ]
})
export class MainNavComponent implements OnInit {

  section:string;
  hideMenu:boolean = false;
  showMenu:boolean = true;
  toggleSearch: boolean = false;
  isLoading:boolean = false;
  listStyle:boolean = false;
  searchForm: FormGroup;

  pageNumber: number;
  pageTotalNumber: number;
  chapterNumber: number;
  chapterTotalNumber: number;

  constructor(private nightTime: NightTimeService,
              private navService: MainNavService,
              private router: Router) {}

  ngOnInit() {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl('')
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd ) {
        this.checkSection(event.url);
      }
    });

    this.navService.viewerSettingStream$.subscribe(settings => {
      this.pageNumber = settings.page;
      this.pageTotalNumber = settings.pageTotal;
      this.chapterNumber = settings.chapter;
      this.chapterTotalNumber = settings.chapterTotal;
    });
  }

  updateListStyle() {
    this.listStyle = !this.listStyle;
    this.navService.updateListType(this.listStyle);
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
        this.showMenu = true;
        this.hideMenu = false;
        break;
      case '/':
        this.section = 'recommended';
        this.showMenu = true;
        this.hideMenu = false;
        break;
      default:
        this.section = 'recommended';
        this.showMenu = true;
        this.hideMenu = false;
        break;
    }
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  toggleSearchInput() {
    if (!this.toggleSearch) {
      this.searchForm.get('searchTerm').setValue(null);
    }
    this.toggleSearch = true;
    if (this.searchForm.get('searchTerm').value) {
      const searchTerm = this.searchForm.get('searchTerm').value.split(' ').join('-');
      if (searchTerm) {
        this.toggleSearch = false;
        this.router.navigateByUrl('search/' + searchTerm);
      }
    }
  }

}
