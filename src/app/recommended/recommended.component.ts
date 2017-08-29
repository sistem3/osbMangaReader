import { Component, OnInit } from '@angular/core';
import { RecommendedService } from './recommended.service';
import { MangaDetailsService } from '../manga-details/manga-details.service';
import { UserSettingsService } from '../settings/user-settings.service';
import { MainNavService } from '../main-nav/main-nav.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  providers: [ RecommendedService, MangaDetailsService, UserSettingsService ]
})
export class RecommendedComponent implements OnInit {

  errorMessage = '';
  manga = {};
  recommendedList = [];
  listStyle: boolean = false;
  isLoading: boolean = true;

  constructor(private mangaDetails:MangaDetailsService,
              private userSettings: UserSettingsService,
              private navService: MainNavService,
              private recommended:RecommendedService) { }

  ngOnInit() {
    this.navService.listTypeStream$.subscribe(listType => {
      this.listStyle = listType;
    });
    this.mangaDetails.getCachedDetails();
    this.recommended.getRecommended().subscribe(
      recommended => this.setRecommended(recommended),
      error =>  this.errorMessage = <any>error);
  }

  setRecommended(recommended) {
    recommended.forEach((item) => {
      let cacheCheck = this.mangaDetails.checkCachedDetails(item.mangaId);
      if (cacheCheck) {
        this.recommendedList.push(cacheCheck);
        this.isLoading = false;
        return false;
      }
      this.getMangaDetails(item.mangaId);
    });
  }

  getMangaDetails(manga) {
    this.mangaDetails.getDetails(manga).subscribe(
      manga => this.setMangaDetails(manga),
      error =>  this.errorMessage = <any>error);
  }

  setMangaDetails(manga) {
    this.recommendedList.push(manga);
    this.mangaDetails.cacheDetails(manga);
    this.isLoading = false;
  }

  addFavourite(manga) {
    this.userSettings.addFavourite(manga);
  }

  checkFavourite(manga) {
    return this.userSettings.checkFavourites(manga);
  }

}
