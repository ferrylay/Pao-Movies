import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-searchmovies',
  templateUrl: './searchmovies.component.html',
  styleUrls: ['./searchmovies.component.css']
})
export class SearchmoviesComponent implements OnInit {

  searchData: string;
  sub: Subscription;
  results = new Array();

  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
    this.searchData = params.get('searchData'); 
      this.http.get('https://api.themoviedb.org/3/search/movie?api_key=aaeec0551acb10d5d267f42253e1a033&language=en-US&query='+ this.searchData +'&page=1&include_adult=false')
      .subscribe(Response => {
        console.log(Response['results']);
        for(let i = 0; i < Response['results'].length; i++){
          if(Response['results'][i]['poster_path'] != null){
            this.results.push(Response['results'][i]);
          }
        }
        console.log(this.results);
      });
   });
  }

}
