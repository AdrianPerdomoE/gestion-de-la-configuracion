import { Component, OnInit } from '@angular/core';
import { Observable, of, mergeMap, iif } from 'rxjs';
import { Global } from 'src/app/shared/constants/Global';
import { Pyme } from 'src/app/shared/models/Pyme';
import { NotificationService } from 'src/app/shared/services/Notification.service';
import { PymeService } from 'src/app/shared/services/Pyme.service';
import { UploadFileService } from 'src/app/shared/services/UploadFileService';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register-pyme',
  templateUrl: './register-pyme.component.html',
  styleUrls: ['./register-pyme.component.css'],
})
export class RegisterPymeComponent implements OnInit {
  public auxPyme: Pyme = new Pyme('', '', '', '', new Date(), '');
  public invalidEmail: boolean = false;
  public filesToUpload: Array<File>;
  public url = Global.url;
  public categorys = [Global.MARKETS, Global.RESTAURANTS, Global.STORES];
  constructor(
    private _PymeService: PymeService,
    private _UserService: UserService,
    private _notificationService: NotificationService,
    private _uploadFileService: UploadFileService
  ) {
    this.filesToUpload = new Array<File>();
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  ngOnInit(): void {}
  verifyEmail(email: string) {
    let patron = new RegExp(
      '^[a-z]+[a-z0-9._-]+@[a-z]+[.]+(.[a-z]+)*(.[a-z]{2,5})$'
    );
    this.invalidEmail = !patron.test(email);
  }
  agree(checked: any) {}
  onRegistry() {
    const returnTrue = (): Observable<any> => {
      return of({ Exist: true });
    };

    this._PymeService
      .emailExistence(this.auxPyme.email ? this.auxPyme.email : '')
      .pipe(
        mergeMap((resultado) =>
          iif(
            () => resultado.Exist,
            returnTrue(),
            this._UserService.emailExistence(
              this.auxPyme.email ? this.auxPyme.email : ''
            )
          )
        )
      )
      .subscribe((re: any) => {
        if (re.Exist == false) {
          this._PymeService.registerPyme(this.auxPyme).subscribe((resul) => {
            if (resul.PYME) {
              let pyme: Pyme = resul.PYME;
              if (this.filesToUpload.length >= 1) {
                this._uploadFileService
                  .makeFileRequest(
                    `${this.url}UploadImagePyme/${pyme._id}`,
                    [],
                    this.filesToUpload,
                    'image'
                  )
                  .then((result: any) => {
                    this._notificationService.enviarAlerta(
                      'info',
                      'Registro',
                      'Su pyme ha sido creada correctamente'
                    );
                    this.auxPyme = new Pyme('', '', '', '', new Date(), '');
                  });
              }
             
            } else {
              this._notificationService.enviarAlerta(
                'error',
                'Registro',
                'No fue posible crear la pyme por un problema en el sistema'
              );
            }
          });
        } else {
          this._notificationService.enviarAlerta(
            'warning',
            'Registro',
            'El correo ingresado ya esta vinculado a una cuenta en el sistema'
          );
        }
      });
  }
}
