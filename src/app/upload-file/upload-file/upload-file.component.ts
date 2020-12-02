import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UploadFileService } from './../upload-file.service';
import { environment } from './../../../environments/environment';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit, OnDestroy {
  files: Set<File>;
  sub: Subscription;
  progress = 0;

  constructor(private uploadFileService: UploadFileService) {}

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
        .subscribe((event: HttpEvent<Object>) => {
          if (event.type === HttpEventType.Response) {
            console.log('Upload concluído');
          } else if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((event.loaded * 100) / event.total);
            console.log('Progresso', percentDone);
            this.progress = percentDone;
          }
        });
    }
  }
}
