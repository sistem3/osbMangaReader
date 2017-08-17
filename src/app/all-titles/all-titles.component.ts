import { Component, OnInit, OnDestroy } from '@angular/core';
import { AllTitlesService } from './all-titles.service';
import { MangaDetailsService } from '../manga-details/manga-details.service';
import { UserSettingsService } from '../settings/user-settings.service';
import { MainNavService } from '../main-nav/main-nav.service';

declare let ScrollMagic;

@Component({
  selector: 'app-all-titles',
  templateUrl: './all-titles.component.html',
  providers: [ AllTitlesService, MangaDetailsService, UserSettingsService ]
})
export class AllTitlesComponent implements OnInit, OnDestroy {

  errorMessage = '';
  allTitlesHolder = [];
  allTitlesListing = [];
  listStyle:boolean = false;
  pageLength: number = 20;
  page: number = 1;
  pageController: any;
  pageScene: any;
  paginationType: string = '#paginationLoaderList';

  constructor(private allTitles: AllTitlesService,
              private userSettings: UserSettingsService,
              private navService: MainNavService,
              private mangaDetails: MangaDetailsService) { }

  ngOnInit() {
    this.getAllTitles();
    this.navService.listTypeStream$.subscribe(listType => {
      this.listStyle = listType;
      if (this.pageController != null) {
        this.pageController.destroy();
        this.pageController = null;
        this.startPagination();
      }
    });
  }

  ngOnDestroy() {
    if (this.pageController != null) {
      this.pageController.destroy();
      this.pageController = null;
    }

    if (this.pageScene != null) {
      this.pageScene.destroy();
      this.pageScene = null;
    }
  }

  getAllTitles() {
    this.allTitles.getAll().subscribe(
      allTitles => this.setAll(allTitles),
      error =>  this.errorMessage = <any>error);
  }

  getMangaDetails(manga) {
    this.mangaDetails.getDetails(manga).subscribe(
      manga => this.setMangaDetails(manga),
      error =>  this.errorMessage = <any>error);
  }

  getMoreManga() {
    this.page++;
    let nextViewList = this.allTitlesHolder.slice(this.pageLength * (this.page - 1), this.pageLength * this.page);
    nextViewList.forEach((item, index) => {
      this.getMangaDetails(item.mangaId);
      if (index + 1 == nextViewList.length) {
        document.querySelector(this.paginationType).classList.remove('active');
      }
    });
  }

  setMangaDetails(manga) {
    this.allTitlesListing.push(manga);
  }

  setAll(allTitles) {
    this.allTitlesHolder = allTitles;
    let firstViewList = this.allTitlesHolder.slice(0, this.pageLength);
    firstViewList.forEach((item, index) => {
      this.getMangaDetails(item.mangaId);
      if (index + 1 == firstViewList.length) {
        this.startPagination();
      }
    });
  }

  addFavourite(manga) {
    this.userSettings.addFavourite(manga);
  }

  checkFavourite(manga) {
    return this.userSettings.checkFavourites(manga);
  }

  startPagination() {
    if (!this.listStyle) {
      this.paginationType = '#paginationLoaderList';
    } else {
      this.paginationType = '#paginationLoader';
    }
    this.pageController = new ScrollMagic.Controller();
    setTimeout(() => {
      this.pageScene = new ScrollMagic.Scene({triggerElement: this.paginationType, triggerHook: 'onEnter'})
        .addTo(this.pageController)
        .on('enter', (e) => {
          document.querySelector(this.paginationType).classList.add('active');
          this.getMoreManga();
        });
      this.pageScene.update();
    }, 1500);
  }

}
