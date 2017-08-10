import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MangaViewerService } from './manga-viewer.service';
import { MangaDetailsService } from '../manga-details/manga-details.service';

declare let Swiper;
let pageScene;

@Component({
  selector: 'app-manga-viewer',
  templateUrl: './manga-viewer.component.html',
  providers: [ MangaDetailsService ]
})
export class MangaViewerComponent implements OnInit, OnDestroy {

  chapter: any;
  chapterNum:number = 1;
  chapterTotal: number;

  nextChapter:number;
  prevChapter:number;
  mangaTitle:string = '';
  errorMessage:string = '';

  pageNumber:number = 1;
  totalPages: number = 0;

  chapterLoaded = false;
  isLoading = true;
  nextChapterShow = false;
  prevChapterShow = false;
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
              private mangaDetails: MangaDetailsService,
              private mangaViewer: MangaViewerService) { }

  ngOnInit() {
    this.isLoading = true;
    this.route.params.subscribe((details) => this.getMangaChapter(details));
  }

  ngOnDestroy() {
    this.pageNumber = 1;
    this.totalPages = 1;
    this.chapterNum = 1;
    this.chapterTotal = 1;
    this.mangaViewer.updateViewerDetails('page', this.pageNumber);
    this.mangaViewer.updateViewerDetails('pageTotal', this.totalPages);
    this.mangaViewer.updateViewerDetails('chapter', this.chapterNum);
    this.mangaViewer.updateViewerDetails('chapterTotal', this.chapterTotal);
  }

  onSwiperInit(swiper) {
    this.nextChapterShow = this.pageNumber == this.totalPages;
    this.prevChapterShow = this.pageNumber == 1 && this.chapterNum > 1;
    swiper.enableKeyboardControl();
  }

  onSwipePage(swiper) {
    this.pageNumber = swiper.activeIndex + 1;
    this.mangaViewer.updateViewerDetails('page', this.pageNumber);
    this.nextChapterShow = this.pageNumber == this.totalPages;
    this.prevChapterShow = this.pageNumber == 1 && this.chapterNum > 1;
  }

  setChaptersLength(chapters) {
    this.chapterTotal = chapters.length;
    this.mangaViewer.updateViewerDetails('chapterTotal', this.chapterTotal);
  }

  getMangaDetails(manga) {
    this.mangaDetails.getDetails(manga).subscribe(
      manga => this.setChaptersLength(manga.chapters),
      error =>  this.errorMessage = <any>error);
  }

  goToChapter(direction) {
    this.isLoading = true;
    if (direction === 'forward') {
      this.router.navigate(['/chapter', this.mangaTitle, this.nextChapter]);
    } else if (direction === 'backward') {
      this.router.navigate(['/chapter', this.mangaTitle, this.prevChapter]);
    }
  }

  getMangaChapter(details) {
    this.isLoading = true;
    this.mangaTitle = details.title;
    this.chapterNum = parseInt(details.number);
    this.mangaViewer.updateViewerDetails('chapter', this.chapterNum);
    this.nextChapter = this.chapterNum + 1;
    this.prevChapter = this.chapterNum - 1;
    this.mangaViewer.getChapter(details.title, details.number).subscribe(
      chapter => this.setMangaChapter(chapter),
      error =>  this.errorMessage = <any>error);
  }

  setMangaChapter(chapter) {
    this.chapter = chapter;
    this.chapterLoaded = true;
    this.totalPages = chapter.pages.length;
    this.mangaViewer.updateViewerDetails('pageTotal', this.totalPages);
    this.getMangaDetails(this.mangaTitle);
    this.isLoading = false;

    if (pageScene) {
      pageScene.destroy();
      pageScene = null;
    }

    setTimeout(() => {
      document.querySelector('.swiper-container').setAttribute('style','height:' + window.innerHeight + 'px;');
      pageScene = new Swiper(document.querySelector('.swiper-container'), this.sliderSettings);
    }, 500);
  }

}
