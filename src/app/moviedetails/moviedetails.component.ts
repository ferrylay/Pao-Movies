import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.component.html',
  styleUrls: ['./moviedetails.component.css']
})
export class MoviedetailsComponent implements OnInit {

  id: string;
  sub: Subscription;
  results: any;
  images: any;

  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      this.id = params.get('id'); 
      this.http.get('https://api.themoviedb.org/3/movie/'+ this.id +'?api_key=aaeec0551acb10d5d267f42253e1a033')
      .subscribe(Response => {
        console.log(Response);
        this.results = Response;
      });
      this.http.get('https://api.themoviedb.org/3/movie/' + this.id +'/images?api_key=aaeec0551acb10d5d267f42253e1a033')
      .subscribe(Response => {
        console.log(Response['posters']);
        console.log(Response);
        this.images = Response['posters'];
      });
   });
  }

}
