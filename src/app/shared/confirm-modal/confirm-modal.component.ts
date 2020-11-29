import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent implements OnInit {
  @Input() title: string;
  @Input() msg: string;

  @Input() confirmTxt = 'Confirmar';
  @Input() cancelTxt = 'Cancelar';

  confirmResult: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.confirmResult = new Subject();
  }

  onCancel() {
    this.confirmAndClose(false);
  }

  onConfirm() {
    this.confirmAndClose(true);
  }

  private confirmAndClose(value: boolean) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }
}