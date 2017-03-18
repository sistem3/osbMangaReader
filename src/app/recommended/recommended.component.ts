import { Component, OnInit } from '@angular/core';
import { RecommendedService } from './recommended.service';
import { MangaDetailsService } from '../manga-details/manga-details.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  providers: [ RecommendedService, MangaDetailsService ]
})
export class RecommendedComponent implements OnInit {

  errorMessage = '';
  manga = {};
  recommendedList = [];
  listStyle:boolean = false;

  constructor(private mangaDetails:MangaDetailsService, private recommended:RecommendedService) { }

  ngOnInit() {
    console.log('Starting up');
    this.recommended.getRecommended().subscribe(
      recommended => this.setRecommended(recommended),
      error =>  this.errorMessage = <any>error);
  }

  setRecommended(recommended) {
    recommended.forEach((item) => {
      console.log(item);
      this.getMangaDetails(item.mangaId);
    });
  }

  getMangaDetails(manga) {
    console.log(manga);
    this.mangaDetails.getDetails(manga).subscribe(
      manga => this.setMangaDetails(manga),
      error =>  this.errorMessage = <any>error);
  }

  setMangaDetails(manga) {
    console.log(manga);
    this.recommendedList.push(manga);
  }

}
