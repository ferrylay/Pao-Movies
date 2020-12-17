import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { MoviesComponent } from './movies/movies.component';
import { SearchmoviesComponent } from './searchmovies/searchmovies.component';

const routes: Routes = [
  { path: 'Movies', component: MoviesComponent },
  { path: 'Movies/Genre/:genreid', component: MoviesComponent },
  { path: 'Search/:searchData', component: SearchmoviesComponent },
  { path: '', component: HomepageComponent },
  { path: 'Movies/:id', component: MoviedetailsComponent },
  { path: 'aboutUs', component: AboutUsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
