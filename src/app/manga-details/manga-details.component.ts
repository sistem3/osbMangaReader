import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MangaDetailsService } from './manga-details.service';

@Component({
  selector: 'app-manga-details',
  templateUrl: './manga-details.component.html',
  providers: [ MangaDetailsService ]
})
export class MangaDetailsComponent implements OnInit {

  errorMessage: any;
  details: any;
  isLoading: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private mangaDetails: MangaDetailsService) { }

  ngOnInit() {
    this.details = {};
    this.isLoading = true;
    this.route.params.subscribe((manga) => this.getMangaDetails(manga));
  }

  getMangaDetails(manga) {
    this.mangaDetails.getDetails(manga.title).subscribe(
      manga => this.setMangaDetails(manga),
      error =>  this.errorMessage = <any>error);
  }

  setMangaDetails(manga) {
    this.details = manga;
    this.details.chapterSelect = '0';
    this.isLoading = false;
  }

  goToChapter() {
    this.router.navigateByUrl('/chapter/' + this.details.href + '/' + (parseInt(this.details.chapterSelect) + 1));
  }

}
