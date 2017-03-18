import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaDetailsService } from './manga-details.service';

@Component({
  selector: 'app-manga-details',
  templateUrl: './manga-details.component.html',
  providers: [ MangaDetailsService ]
})
export class MangaDetailsComponent implements OnInit {

  errorMessage = '';
  details = {};
  detailsLoaded:boolean = false;

  constructor(private route: ActivatedRoute, private mangaDetails: MangaDetailsService) { }

  ngOnInit() {
    this.route.params.subscribe((manga) => this.getMangaDetails(manga));
  }

  getMangaDetails(manga) {
    console.log(manga);
    this.mangaDetails.getDetails(manga.title).subscribe(
      manga => this.setMangaDetails(manga),
      error =>  this.errorMessage = <any>error);
  }

  setMangaDetails(manga) {
    console.log(manga);
    this.details = manga;
    this.detailsLoaded = true;
  }

}
