import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

import { CursosService } from './../cursos.service';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Curso } from '../curso';
@Component({
  selector: 'app-cursos-form',
  templateUrl: './cursos-form.component.html',
  styleUrls: ['./cursos-form.component.scss'],
})
export class CursosFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CursosService,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.buildForm();

    this.route.params
      .pipe(
        map((params) => params.id),
        switchMap((id) => this.service.loadById(id)),
      )
      .subscribe((curso) => {
        console.log(curso);
        this.updateForm(curso);
      });
  }

  buildForm() {
    this.form = this.fb.group({
      id: [null],
      nome: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
    });
  }

  updateForm(curso: Curso) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome,
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.service.create(this.form.value).subscribe(
        (result) => {
          this.alertService.showAlertSuccess('Criado com sucesso');
          this.location.back();
        },
        (error) => {
          this.alertService.showAlertDanger('Falha ao salvar curso');
        },
      );
    }
  }

  private create() {
    //
  }

  private update() {
    //
  }

  private save() {
    //
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }
}
