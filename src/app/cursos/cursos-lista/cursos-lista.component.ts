import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

import { Curso } from '../curso';
import { CursosService } from '../cursos.service';
@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.css'],
})
export class CursosListaComponent implements OnInit {
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  bsModalRef: BsModalRef;

  constructor(
    private service: CursosService,
    private modalService: BsModalService,
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
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message =
      'Erro ao carregar lista de cursos. Tente novamente mais tarde.';
  }
}
