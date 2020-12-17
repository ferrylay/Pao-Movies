import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  lis: []; 
  latest: any;
  slides: any = [[]];
  slides2: any = [[]];  
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=aaeec0551acb10d5d267f42253e1a033')
    .subscribe(Response => {
      this.lis = Response['results'];
      this.slides = this.chunk(this.lis,5);
    });
    this.http.get('https://api.themoviedb.org/3/movie/top_rated?api_key=aaeec0551acb10d5d267f42253e1a033&language=en-US&page=1')
    .subscribe(Response => {
      this.latest = Response['results'];
      this.slides2 = this.chunk(this.latest,5);
    });
    
  }

  chunk(arr,chunkSize){
    let R= [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
}
