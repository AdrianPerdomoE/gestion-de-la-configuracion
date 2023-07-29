import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/shared/constants/Global';
import { Pyme } from 'src/app/shared/models/Pyme';
import { NotificationService } from 'src/app/shared/services/Notification.service';
import { SesionService } from 'src/app/shared/services/Sesion.service';
import { UploadFileService } from 'src/app/shared/services/UploadFileService';

@Component({
  selector: 'app-profile-pyme',
  templateUrl: './profile-pyme.component.html',
  styleUrls: ['./profile-pyme.component.css'],
})
export class ProfilePymeComponent implements OnInit {
  public filesToUpload: Array<File>;
  public pyme: any;
  public url = Global.url;
  constructor(
    private _uploadFileService: UploadFileService,
    private sesionService: SesionService,
    private _notificationService: NotificationService
  ) {
    this.filesToUpload = new Array<File>();
    this.pyme = this.sesionService.getCurrentUser();
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  ngOnInit(): void {}
  save() {
    if (this.filesToUpload.length >= 1) {
      this._uploadFileService
        .makeFileRequest(
          `${this.url}UploadImagePyme/${this.pyme._id}`,
          [],
          this.filesToUpload,
          'image'
        )
        .then((result: any) => {
          this._notificationService.enviarNotificacion(
            'info',
            'Cambio',
            'Su logo ha sido guardado exitosamente'
          );
          this.sesionService.logSesion(result.pyme);
          this.pyme = result.pyme;
        });
    }
  }
}
