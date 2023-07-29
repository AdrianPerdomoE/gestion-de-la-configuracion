import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PymeService } from '../../services/Pyme.service';
import { UserService } from '../../services/user.service';
import { NotificationService } from '../../services/Notification.service';
import { Observable, iif, of } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { SesionService } from '../../services/Sesion.service';
import { User } from '../../models/User';
import { Sesion } from '../../models/Sesion';
import { Pyme } from '../../models/Pyme';
import { Router } from '@angular/router';
import { KartService } from '../../services/Kart.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NgbModal],
})
export class LoginComponent implements OnInit {
  public invalidEmail: boolean = false;
  public email: string = '';
  public password: string = '';
  constructor(
    private modalService: NgbModal,
    private _PymeService: PymeService,
    private _UserService: UserService,
    private _notificationService: NotificationService,
    private _sessionService: SesionService,
    private _router: Router,
    private _kartService: KartService
  ) {}

  ngOnInit(): void {}
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
  verifyEmail(email: string) {
    let patron = new RegExp(
      '^[a-z]+[a-z0-9._-]+@[a-z]+[.]+(.[a-z]+)*(.[a-z]{2,5})$'
    );
    this.invalidEmail = !patron.test(email);
  }
  log(modal: any) {
    const returnFalse = (): Observable<any> => {
      return of({ Exist: false });
    };
    this._PymeService
      .emailExistence(this.email)
      .pipe(
        mergeMap((resultado: any) =>
          iif(
            () => resultado.Exist,
            this._PymeService.confirmPassword(this.email, this.password),
            this._UserService
              .emailExistence(this.email)
              .pipe(
                mergeMap((res) =>
                  iif(
                    () => res.Exist,
                    this._UserService.confirmPassword(
                      this.email,
                      this.password
                    ),
                    returnFalse()
                  )
                )
              )
          )
        )
      )
      .subscribe((re: any) => {
        if (re?.Exist == false) {
          this._notificationService.enviarAlerta(
            'warning',
            'Inicio de sesión',
            'El correo ingresado no esta vinculado a una cuenta en el sistema'
          );
          return;
        }
        if (re.passwordIsCorrect) {
          let session;
          if (re.type == 'Pyme') {
            session = new Pyme(
              re.LOGGED._id,
              re.LOGGED.name,
              re.LOGGED.category,
              re.LOGGED.pageStyle,
              re.LOGGED.creationDate,
              re.LOGGED.logo
            );
          } else {
            session = new User(
              re.LOGGED._id,
              re.LOGGED.name,
              re.LOGGED.password,
              re.LOGGED.email,
              re.LOGGED.shoppingKart
            );
          }
          this._sessionService.logSesion(session);
          this._notificationService.enviarAlerta(
            'success',
            'Inicio de sesión',
            'Bienvenido ' + re.LOGGED.name
          );
          if (session instanceof User) {
            this._kartService.getCartServer(session._id).subscribe((resp) => {
              if (resp.KART) {
                let sessionKart = this._kartService.getCartSession();
                this._kartService.mixKarts(resp.KART);
                this._kartService
                  .updateCarServer(resp.KART)
                  .subscribe((res) => {
                    if (res.KART) {
                      this._kartService.carritoState.next(res.KART);
                      this._router.navigate(['Home']);
                    }
                  });
              }
            });
          } else {
            this._router.navigateByUrl('/PYME_HOME');
          }
        } else {
          this._notificationService.enviarAlerta(
            'warning',
            'Inicio de sesión',
            'la contraseña es incorrecta'
          );
        }
      });

    modal.close('Close click');
  }
}
