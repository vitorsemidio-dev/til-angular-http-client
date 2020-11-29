import { BsModalService } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = 'info',
  PRIMARY = 'primary',
  WARNING = 'warning',
  SECONDARY = 'secondary',
  LIGHT = 'light',
  DARK = 'dark',
}

@Injectable({
  providedIn: 'root',
})
export class AlertModalService {
  constructor(private modalService: BsModalService) {}

  private showAlert(
    message: string,
    type: AlertTypes,
    dismissTimeout?: number,
  ) {
    const bsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }

  showAlertConfirm(
    title: string,
    msg: string,
    confirmTxt?: string,
    cancelTxt?: string,
  ) {
    const bsModalRef = this.modalService.show(ConfirmModalComponent);

    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;

    if (confirmTxt) {
      bsModalRef.content.confirmTxt = confirmTxt;
    }

    if (cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return bsModalRef.content.confirmResult;
  }
}
