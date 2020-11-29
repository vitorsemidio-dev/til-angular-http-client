import { CursosService } from './../cursos.service';
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { Curso } from './../curso';

@Injectable({
  providedIn: 'root',
})
export class CursoResolver implements Resolve<Curso> {
  constructor(private service: CursosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Curso> | Promise<Curso> {
    if (route.params && route.params.id) {
      return this.service.loadById(route.params.id);
    }

    return of({
      id: null,
      nome: null,
    });
  }
}
