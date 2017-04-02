import { Component, OnInit } from '@angular/core';
import { AllTitlesService } from './all-titles.service';
import { MangaDetailsService } from '../manga-details/manga-details.service';

@Component({
  selector: 'app-all-titles',
  templateUrl: './all-titles.component.html',
  providers: [ AllTitlesService, MangaDetailsService ]
})
export class AllTitlesComponent implements OnInit {

  errorMessage = '';
  allTitlesListing = [];
  pageLength = 0;

  constructor(private allTitles: AllTitlesService,
              private mangaDetails: MangaDetailsService) { }

  ngOnInit() {
    this.getAllTitles();
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

  setMangaDetails(manga) {
    this.allTitlesListing.push(manga);
  }

  setAll(allTitles) {
    //console.log(allTitles);
    let firstViewList = allTitles.slice(0, 19);
    firstViewList.forEach((item) => {
      this.getMangaDetails(item.mangaId);
    });
  }

}
