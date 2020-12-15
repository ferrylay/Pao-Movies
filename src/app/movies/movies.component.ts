import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  genres: [];
  movies = new Array();
  temp: [];
  i: number;
  slides: any = [[]];

  router: Router;
  sub: Subscription;
  idgenre: any;

  constructor(private http: HttpClient,_router: Router,private _Activatedroute: ActivatedRoute) {
    this.router = _router;
  }

  ngOnInit(): void {
    this.http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=aaeec0551acb10d5d267f42253e1a033')
    .subscribe(Response => {
      console.log(Response);
      this.genres = Response['genres'];
      this.slides = this.chunk(this.genres, 9);
    });
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
        this.idgenre = params.get('genreid');
        let genreid = this.idgenre;
        for(let j = 1; j < 50; j++){
          this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=aaeec0551acb10d5d267f42253e1a033&page=' + j)
          .subscribe(Response => {
            this.temp = Response['results'];
            for(let i = 0; i < this.temp.length; i++){
              Response['results'][i]['genre_ids'].forEach(element => {
                  if(genreid == element){
                    this.movies.push(Response['results'][i]);
                  }
              });
            }
          });
        }
     });
  }

  getMovie(genreid: number): void {
    this.movies = [];
    this.router.navigate(['/Movies/Genre',genreid]);
    for(let j = 1; j < 50; j++){
      this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=aaeec0551acb10d5d267f42253e1a033&page=' + j)
      .subscribe(Response => {
        console.log(Response['results']);
        this.temp = Response['results'];
        for(let i = 0; i < this.temp.length; i++){
          Response['results'][i]['genre_ids'].forEach(element => {
              if(genreid == element){
                this.movies.push(Response['results'][i]);
              }
          });
        }
      });
    }
  }

  chunk(arr,chunkSize){
    let R= [];
    console.log(arr.length);
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

}
