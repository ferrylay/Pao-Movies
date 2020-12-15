import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { MoviesComponent } from './movies/movies.component';
import { SearchmoviesComponent } from './searchmovies/searchmovies.component';

const routes: Routes = [
  { path: 'Movies', component: MoviesComponent },
  { path: 'Search/:searchData', component: SearchmoviesComponent },
  { path: '', component: HomepageComponent },
  { path: 'Movies/:id', component: MoviedetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
