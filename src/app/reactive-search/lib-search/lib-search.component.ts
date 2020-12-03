import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  tap,
  switchMap,
} from 'rxjs/operators';

interface Curso {
  name: string;
  version: string;
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

  ngOnInit() {
    this.onReactiveSearch();
  }

  onReactiveSearch() {
    this.results$ = this.queryField.valueChanges.pipe(
      map((value) => value.trim()),
      filter((value: string) => value.length > 2),
      debounceTime(200),
      distinctUntilChanged(),
      tap((value) => console.log(value)),
      switchMap((value) => this.sendSearchRequest(value)),
      tap((res: CdnjsResponse) => (this.total = res.total)),
      map((res: CdnjsResponse) => res.results),
    );
  }

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

  private sendSearchRequest(search: string) {
    const fields = 'name,descriptions,version,homepage';

    const params = {
      search,
      fields,
    };
    return this.http.get<CdnjsResponse>(this.SEARCH_URL, {
      params,
    });
  }
}
