import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { CrudService } from './../shared/crud-service';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root',
})
export class CursosService extends CrudService<Curso> {
  constructor(protected http: HttpClient) {
    super(http, `${environment.apiUrl}/cursos`);
  }
}
