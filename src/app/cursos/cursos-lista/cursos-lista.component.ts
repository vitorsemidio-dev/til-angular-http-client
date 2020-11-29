import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
  @ViewChild('deleteModal') deleteModal;

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  modalRef: BsModalRef;

  cursoSelecionado: Curso;

  constructor(
    private service: CursosService,
    private modalService: BsModalService,
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
    this.modalRef = this.modalService.show(this.deleteModal, {
      class: 'modal-sm',
    });
  }

  onConfirmDelete(): void {
    this.service.delete(this.cursoSelecionado).subscribe(
      (result) => {
        this.alertService.showAlertSuccess('Curso removido com sucesso');
        this.onRefrash();
      },
      (error) => {
        this.alertService.showAlertDanger('Falha ao remover curso');
      },
    );
    this.modalRef.hide();
  }

  onDeclineDelete(): void {
    this.modalRef.hide();
  }
}
