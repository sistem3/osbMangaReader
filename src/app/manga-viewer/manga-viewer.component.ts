import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MangaViewerService } from './manga-viewer.service';

declare let Swiper;

@Component({
  selector: 'app-manga-viewer',
  templateUrl: './manga-viewer.component.html',
  providers: [ MangaViewerService ]
})
export class MangaViewerComponent implements OnInit {

  chapter = {};
  chapterNum:number = 1;
  mangaTitle:string = '';
  errorMessage:string = '';
  pageNumber:number = 1;
  totalPages: number = 0;
  chapterLoaded = false;
  chapterView = {};
  sliderSettings = {
    initialSlide: 0,
    slidesPerView: 1,
    keyboardControl: true,
    preloadImages: false,
    lazyLoading: true,
    onInit: this.onSwiperInit.bind(this),
    onSlideChangeEnd: this.onSwipePage.bind(this),
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private mangaViewer: MangaViewerService) { }

  ngOnInit() {
    this.route.params.subscribe((details) => this.getMangaChapter(details));
  }

  onSwiperInit(swiper) {
    console.log('Init Swiper bruv');
    //console.log(swiper);
  }

  onSwipePage(swiper) {
    this.pageNumber = swiper.activeIndex + 1;
    this.updateNavPage();
  }

  updateNavPage() {
    document.getElementById('navPageNumber').innerText = this.pageNumber.toString();
  }

  updateNavChapter() {
    document.getElementById('navChaptersTotal').innerText = this.chapterNum.toString();
  }

  updateNavPageTotal() {
    document.getElementById('navPagesTotalNumber').innerText = this.totalPages.toString();
  }

  goToNextChapter() {
    this.chapterNum++;
    this.router.navigate(['/chapter', this.mangaTitle, this.chapterNum]);
  }

  getMangaChapter(details) {
    //console.log(details);
    this.mangaTitle = details.title;
    this.chapterNum = details.number;
    this.mangaViewer.getChapter(details.title, details.number).subscribe(
      chapter => this.setMangaChapter(chapter),
      error =>  this.errorMessage = <any>error);
  }

  setMangaChapter(chapter) {
    //console.log(chapter);
    this.chapter = chapter;
    this.chapterLoaded = true;
    this.totalPages = chapter.pages.length;
    this.updateNavChapter();
    this.updateNavPageTotal();

    setTimeout(() => {
      console.log('Starting swiper');
      document.querySelector('.swiper-container').setAttribute('style','height:' + window.innerHeight + 'px;');
      this.chapterView = new Swiper(document.querySelector('.swiper-container'), this.sliderSettings);
    }, 500);
  }

}
