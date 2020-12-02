import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  lis: []; 
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=aaeec0551acb10d5d267f42253e1a033')
    .subscribe(Response => {
      console.log(Response);
      this.lis = Response['results'];
    });
    this.http.get(`https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=aaeec0551acb10d5d267f42253e1a033`)
    //'https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=aaeec0551acb10d5d267f42253e1a033'
    //"/4ZocdxnOO6q2UbdKye2wgofLFhB.jpg"
    //https://api.themoviedb.org/3/movie//images?api_key=aaeec0551acb10d5d267f42253e1a033
    //https://image.tmdb.org/t/p/w500/4ZocdxnOO6q2UbdKye2wgofLFhB.jpg"
  }

}
