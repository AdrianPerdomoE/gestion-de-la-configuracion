import { Injectable } from '@angular/core';
import { User } from '../models/User';
import { Sesion } from '../models/Sesion';
import { Pyme } from '../models/Pyme';
import { Global } from '../constants/Global';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  constructor() {}

  logSesion(logger: User | Pyme): void {
    let newSesion = new Sesion(logger);
    let sesionString = JSON.stringify(newSesion);
    sessionStorage.setItem(Global.SESSION, sesionString);
  }
  logOut(): void {
    sessionStorage.removeItem(Global.SESSION);
  }

  confirmOpenSesion(): Boolean {
    let sesionString = sessionStorage.getItem(Global.SESSION);
    if (sesionString) {
      return true;
    }
    return false;
  }
  getCurrentUser(): User | undefined | Pyme {
    let sesionString = sessionStorage.getItem(Global.SESSION);
    if (sesionString) {
      let logger: Sesion = JSON.parse(sesionString);
      return logger.CurrentSesion;
    }
    return undefined;
  }
  getCurrentType(): String {
    let sesionString = sessionStorage.getItem(Global.SESSION);
    if (sesionString) {
      let logger: Sesion = JSON.parse(sesionString);
      return logger.type;
    }
    return "";
  }
}
