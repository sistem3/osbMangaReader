import { Injectable } from '@angular/core';

@Injectable()
export class UserSettingsService {

  userName = '';
  favourites = [];

  constructor() {
    this.checkFavouriteCache();
  }

  checkFavouriteCache() {
    //console.log('Checking Favourite Cache');
    let favouriteCache = localStorage.getItem('osbMangaReader.favourites');
    if (favouriteCache) {
      this.favourites = JSON.parse(favouriteCache);
    }
  }

  addFavourite(manga) {
    let alreadyHave = this.checkFavourites(manga);
    if (alreadyHave) {
      //console.log('Already got this one');
      return false;
    }
    this.favourites.push(manga);
    //console.log(this.favourites);
    localStorage.setItem('osbMangaReader.favourites', JSON.stringify(this.favourites));
  }

  checkFavourites(manga) {
    //console.log(manga);
    let cachedFavourite = false;
    this.favourites.forEach((favourite) => {
      //console.log(favourite);
      if (favourite.href == manga.href) {
        //console.log('Found one');
        cachedFavourite = true;
      }
    });
    return cachedFavourite;
  }

}
