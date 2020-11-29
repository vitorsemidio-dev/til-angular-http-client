import { Component, OnInit } from '@angular/core';
import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';

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

  cursoSelecionado: Curso;

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

  onDelete(curso: Curso) {
    this.cursoSelecionado = curso;
    const result$ = this.alertService.showAlertConfirm(
      'Confirmação',
      'Tem certeza que deseja remover esse curso?',
    );

    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) => (result ? this.service.delete(curso) : EMPTY)),
      )
      .subscribe(
        (result) => {
          this.alertService.showAlertSuccess('Curso removido com sucesso');
          this.onRefrash();
        },
        (error) => {
          this.alertService.showAlertDanger('Falha ao remover curso');
        },
      );
  }
}
