import { Component, OnInit } from '@angular/core';
import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
import { AlertModalService } from './../../shared/alert-modal.service';
@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
})
export class CursosListaComponent implements OnInit {
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  constructor(
    private service: CursosService,
    private alertService: AlertModalService,
  ) {}

  ngOnInit(): void {
    this.getCursos();
  }

  getCursos() {
    this.onRefrash();
  }

  onRefrash() {
    this.cursos$ = this.service.list().pipe(
      catchError((error) => {
        console.error();
        this.error$.next(true);
        this.handleError();
        return EMPTY;
      }),
    );
  }

  handleError() {
    this.alertService.showAlertDanger(
      'Erro ao carregar lista de cursos. Tente novamente mais tarde.',
    );
  }
}
