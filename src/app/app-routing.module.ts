import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AllTitlesComponent} from './all-titles/all-titles.component';
import {MangaDetailsComponent} from './manga-details/manga-details.component';
import {RecommendedComponent} from './recommended/recommended.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
