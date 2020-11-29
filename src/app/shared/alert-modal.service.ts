import { BsModalService } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

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
}
