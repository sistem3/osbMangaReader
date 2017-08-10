import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { RecommendedComponent } from './recommended/recommended.component';
import { AllTitlesComponent } from './all-titles/all-titles.component';
import { MangaViewerComponent } from './manga-viewer/manga-viewer.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MangaDetailsComponent } from './manga-details/manga-details.component';

import { MainNavService } from './main-nav/main-nav.service';

@NgModule({
  declarations: [
    AppComponent,
    RecommendedComponent,
    AllTitlesComponent,
    MangaViewerComponent,
    MainNavComponent,
    MangaDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [MainNavService],
  bootstrap: [AppComponent]
})
export class AppModule { }
