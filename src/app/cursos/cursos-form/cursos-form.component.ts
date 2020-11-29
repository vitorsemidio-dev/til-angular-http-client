import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Curso } from '../curso';
import { CursosService } from './../cursos.service';
import { AlertModalService } from './../../shared/alert-modal.service';

enum RequestTypes {
  CREATE = 'create',
  UDPATE = 'update',
}

interface FeedbackMsg {
  msgSuccess: string;
  msgError: string;
}
@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  feedbackMsg: FeedbackMsg;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const curso = this.route.snapshot.data.curso;
    this.buildForm(curso);
  }

  buildForm(initialData: Curso) {
    this.form = this.fb.group({
      id: [initialData.id],
      nome: [
        initialData.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.save(this.form.value);
    }
  }

  private save(curso: Curso) {
    if (!curso.id) {
      this.feedbackMsg = this.getFeedbackMesage(RequestTypes.CREATE);
    } else {
      this.feedbackMsg = this.getFeedbackMesage(RequestTypes.UDPATE);
    }

    this.service.save(curso).subscribe(
      (result) => {
        this.alertService.showAlertSuccess(this.feedbackMsg.msgSuccess);
        this.location.back();
      },
      (error) => {
        this.alertService.showAlertDanger(this.feedbackMsg.msgError);
      },
    );
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  private getFeedbackMesage(type: RequestTypes) {
    switch (type) {
      case RequestTypes.CREATE: {
        return {
          msgSuccess: 'Curso criado com sucesso',
          msgError: 'Erro ao criar curso, tente novamente mais tarde',
        };
      }
      case RequestTypes.UDPATE: {
        return {
          msgSuccess: 'Curso atualizado com sucesso',
          msgError: 'Erro ao atualizar curso, tente novamente mais tarde',
        };
      }
      default: {
        return {
          msgSuccess: 'Curso criado com sucesso',
          msgError: 'Erro ao criar curso, tente novamente mais tarde',
        };
      }
    }
  }
}
