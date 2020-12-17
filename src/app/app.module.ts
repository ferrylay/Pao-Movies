import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { HomepageComponent } from './homepage/homepage.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchmoviesComponent } from './searchmovies/searchmovies.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { AboutUsComponent } from './about-us/about-us.component';


@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    HomepageComponent,
    SearchmoviesComponent,
    MoviedetailsComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
