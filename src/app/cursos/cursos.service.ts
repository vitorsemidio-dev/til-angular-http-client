import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment'

import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.apiUrl}/cursos`;

  constructor(
    private http: HttpClient
  ) { }

  list() {
    return this.http.get<Curso[]>(this.API)
      .pipe(
        tap(console.log)
      );
  }
}
