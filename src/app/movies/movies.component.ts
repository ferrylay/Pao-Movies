import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit, AfterViewInit {
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  elements: any = [];
  previous: any = [];
  headElements = [];
  genres: [];
  movies = new Array();
  temp: [];
  i: number;
  slides: any = [[]];
  elementsTemp: any = [];
  router: Router;
  sub: Subscription;
  idgenre: any;


  constructor(private http: HttpClient, _router: Router, private _Activatedroute: ActivatedRoute) {
    this.router = _router;
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(15);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
  }

  ngOnInit(): void {
    this.http.get('https://api.themoviedb.org/3/genre/movie/list?api_key=aaeec0551acb10d5d267f42253e1a033')
      .subscribe(Response => {
        console.log(Response);
        this.genres = Response['genres'];
        this.slides = this.chunk(this.genres, 9);
      });

    this.sub = this._Activatedroute.paramMap.subscribe(params => {
      this.idgenre = params.get('genreid');
      let genreid = this.idgenre;
      for (let j = 1; j < 50; j++) {
        this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=aaeec0551acb10d5d267f42253e1a033&page=' + j)
          .subscribe(Response => {
            this.temp = Response['results'];
            for (let i = 0; i < this.temp.length; i++) {
              Response['results'][i]['genre_ids'].forEach(element => {
                if (genreid == element) {
                  if(Response['results'][i]['poster_path'] != null){
                    this.movies.push(Response['results'][i]);
                  }
                }
              });
            }
            for (let i = 1; i <= this.movies.length; i++) {
              if (this.elements.length < this.movies.length) {
                this.elements.push({ id: i.toString() });
              }
            }
            this.mdbTable.setDataSource(this.elements);
            this.elements = this.mdbTable.getDataSource();
            this.previous = this.mdbTable.getDataSource();
          });
      }
    });
  }

  getMovie(genreid: number): void {
    this.movies = [];
    this.elements = [];
    this.router.navigate(['/Movies/Genre', genreid]);
    for (let j = 1; j < 50; j++) {
      this.http.get('https://api.themoviedb.org/3/movie/popular?api_key=aaeec0551acb10d5d267f42253e1a033&page=' + j)
        .subscribe(Response => {
          this.temp = Response['results'];
          for (let i = 0; i < this.temp.length; i++) {
            Response['results'][i]['genre_ids'].forEach(element => {
              if (genreid == element) {
                if(Response['results'][i]['poster_path'] != null){
                  this.movies.push(Response['results'][i]);
                }
              }
            });
          }
          console.log(Response['results']);
          for (let i = 1; i <= this.movies.length; i++) {
            if (this.elements.length < this.movies.length) {
              this.elements.push({ id: i.toString() });
            }
          }
          this.mdbTable.setDataSource(this.elements);
          this.elements = this.mdbTable.getDataSource();
          this.previous = this.mdbTable.getDataSource();
        });
    }
  }

  chunk(arr, chunkSize) {
    let R = [];
    console.log(arr.length);
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  goToDetails(movieid: string) {
    this.router.navigate(['/Movies', movieid]);
  }

}
