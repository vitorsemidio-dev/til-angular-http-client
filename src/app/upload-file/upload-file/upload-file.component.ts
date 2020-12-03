import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { filterResonse, uploadProgress } from 'src/app/shared/rxjs-operators';
import { AlertModalService } from './../../shared/alert-modal.service';
import { UploadFileService } from './../upload-file.service';
import { environment } from './../../../environments/environment';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit, OnDestroy {
  files: Set<File>;
  sub: Subscription;
  progress = 0;

  constructor(
    private uploadFileService: UploadFileService,
    private alertService: AlertModalService,
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onChange(event) {
    if (!event) {
      return;
    }

    const selectedFiles = event.srcElement.files as FileList;

    const fileNames = [];
    this.files = new Set();

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      fileNames.push(file.name);
      this.files.add(file);
    }

    document.getElementById('label-upload-file').innerHTML = fileNames.join(
      ', ',
    );
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.sub = this.uploadFileService
        .upload(this.files, `${environment.baseUrl}/upload`)
        .pipe(
          uploadProgress((progress) => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResonse(),
        )
        .subscribe((response) =>
          this.alertService.showAlertSuccess('Upload concluído com sucesso'),
        );
    }
  }
}
