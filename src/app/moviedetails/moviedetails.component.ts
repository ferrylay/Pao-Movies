import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
  genres: any;
  cast = new Array();
  temp: any;
  slides: any = [[]];

  constructor(private _Activatedroute: ActivatedRoute,
    private _router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.http.get('https://api.themoviedb.org/3/movie/' + this.id + '?api_key=aaeec0551acb10d5d267f42253e1a033&append_to_response=credits')
        .subscribe(Response => {
          this.results = Response;
          this.genres = Response['genres'];
          this.temp = Response['credits']['cast'];
          for (let i = 0; i < this.temp.length; i++) {
            if (Response['credits']['cast'][i]['profile_path'] != 'null') {
              this.cast.push(Response['credits']['cast'][i]);
            }
          }
          this.slides = this.chunk(this.cast, 5);
        });
      this.http.get('https://api.themoviedb.org/3/movie/' + this.id + '/images?api_key=aaeec0551acb10d5d267f42253e1a033')
        .subscribe(Response => {
          this.images = Response['posters'][0];
        });
    });
  }

  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

}
