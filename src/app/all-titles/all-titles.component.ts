import { Component, OnInit, OnDestroy } from '@angular/core';
import { AllTitlesService } from './all-titles.service';
import { MangaDetailsService } from '../manga-details/manga-details.service';
import { UserSettingsService } from '../settings/user-settings.service';

declare let ScrollMagic;
let pageController, pageScene, paginationType;

@Component({
  selector: 'app-all-titles',
  templateUrl: './all-titles.component.html',
  providers: [ AllTitlesService, MangaDetailsService, UserSettingsService ]
})
export class AllTitlesComponent implements OnInit, OnDestroy {

  errorMessage = '';
  allTitlesHolder = [];
  allTitlesListing = [];
  listStyle = '';
  pageLength = 20;
  page = 1;
  pageController: any;
  pageScene: any;

  constructor(private allTitles: AllTitlesService,
              private userSettings: UserSettingsService,
              private mangaDetails: MangaDetailsService) { }

  ngOnInit() {
    this.getAllTitles();
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
    //console.log(manga);
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
        document.querySelector('#paginationLoaderList').classList.remove('active');
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
    //console.log(manga);
    //console.log('Add to favourite');
    this.userSettings.addFavourite(manga);
  }

  checkFavourite(manga) {
    return this.userSettings.checkFavourites(manga);
  }

  startPagination() {
    //console.log('Starting pagination');
    /*if (this.listStyle) {
      paginationType = '#paginationLoaderList';
    } else {
      paginationType = '#paginationLoader';
    }*/
    this.pageController = new ScrollMagic.Controller();
    setTimeout(() => {
      this.pageScene = new ScrollMagic.Scene({triggerElement: '#paginationLoaderList', triggerHook: 'onEnter'})
        .addTo(this.pageController)
        .on('enter', (e) => {
          document.querySelector('#paginationLoaderList').classList.add('active');
          this.getMoreManga();
        });
      this.pageScene.update();
    }, 1500);
  }

}
