import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MangaDetailsService } from './manga-details.service';

@Component({
  selector: 'app-manga-details',
  templateUrl: './manga-details.component.html',
  providers: [ MangaDetailsService ]
})
export class MangaDetailsComponent implements OnInit {

  errorMessage: any;
  details: any;
  detailsLoaded: boolean;

  constructor(private route: ActivatedRoute, private mangaDetails: MangaDetailsService) { }

  ngOnInit() {
    this.details = {};
    this.detailsLoaded = false;
    this.route.params.subscribe((manga) => this.getMangaDetails(manga));
  }

  getMangaDetails(manga) {
    this.mangaDetails.getDetails(manga.title).subscribe(
      manga => this.setMangaDetails(manga),
      error =>  this.errorMessage = <any>error);
  }

  setMangaDetails(manga) {
    this.details = manga;
    this.detailsLoaded = true;
  }

}
