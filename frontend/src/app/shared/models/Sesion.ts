import { Pyme } from './Pyme';
import { User } from './User';

export class Sesion {
  static GENERAL = 'GENERAL';
  static INSIDE = 'INSIDE';
  static MANAGE = 'MANAGE';
  static PYME = 'PYME';
  static USER = 'USER';
  public searchLevel: string;
  public type: String;
  constructor(public CurrentSesion: User | Pyme) {
    this.searchLevel =
      CurrentSesion instanceof User ? Sesion.GENERAL : Sesion.MANAGE;
    this.type = CurrentSesion instanceof User ? Sesion.USER : Sesion.PYME;
  }
}
