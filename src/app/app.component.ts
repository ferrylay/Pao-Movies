import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Project-UAS';
  searchForm: FormGroup;
  total_pages: number;
  router: Router;

  constructor(private http: HttpClient, private formBuilder: FormBuilder, _router: Router,) {
    this.searchForm = this.formBuilder.group({
      search: ''
    });
    this.router = _router;
  }

  onSubmit(searchData) {
    this.router.navigate(['/Search', searchData.search]);
  }

}
