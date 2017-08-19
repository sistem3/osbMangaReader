import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AllTitlesComponent} from './all-titles/all-titles.component';
import {MangaDetailsComponent} from './manga-details/manga-details.component';
import {MangaViewerComponent} from './manga-viewer/manga-viewer.component';
import {RecommendedComponent} from './recommended/recommended.component';
import {SearchComponent} from './search/search.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RecommendedComponent
  },
  {
    path: 'all',
    component: AllTitlesComponent
  },
  {
    path: 'details/:title',
    component: MangaDetailsComponent
  },
  {
    path: 'chapter/:title/:number',
    component: MangaViewerComponent
  },
  {
    path: 'search/:term',
    component: SearchComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
