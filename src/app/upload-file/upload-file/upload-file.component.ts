import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UploadFileService } from './../upload-file.service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit, OnDestroy {
  files: Set<File>;
  sub: Subscription;

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
        .upload(this.files, 'http://localhost:3000/upload')
        .subscribe((response) => console.log('Upload concluído'));
    }
  }
}
