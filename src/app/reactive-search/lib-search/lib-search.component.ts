import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface Curso {
  name: string;
}

interface CdnjsResponse {
  results: Curso[];
  total: number;
}

@Component({
  selector: 'app-lib-search',
  templateUrl: './lib-search.component.html',
  styleUrls: ['./lib-search.component.scss'],
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl();
  readonly SEARCH_URL = 'https://api.cdnjs.com/libraries';

  results$: Observable<any>;
  total: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  onSearch() {
    let value = this.queryField.value;

    if (value && (value = value.trim()) !== '') {
      const fields = 'name,descriptions,version,homepage';

      const params = {
        search: value,
        fields,
      };

      let httpParams = new HttpParams();
      httpParams = httpParams.set('search', value);
      httpParams = httpParams.set('fields', fields);

      this.results$ = this.http
        .get<CdnjsResponse>(this.SEARCH_URL, {
          params: httpParams,
        })
        .pipe(
          tap((res) => (this.total = res.total)),
          map((res) => res.results),
        );
    }
  }
}
