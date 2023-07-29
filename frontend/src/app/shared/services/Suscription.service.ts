import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../constants/Global';
import { Suscription } from '../models/Suscription';

@Injectable({
  providedIn: 'root',
})
export class SuscriptionService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  registerSuscription(suscription: Suscription): Observable<any> {
    let params = JSON.stringify(suscription);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}saveSuscription`, params, { headers: headers });
  }

  getSuscription(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}getSuscription/${id}`, { headers: headers });
  }

  getSuscriptionsPyme(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}getSuscriptionsPyme/${id}`, { headers: headers });
  }
  getSuscriptionsUser(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}getSuscriptionsUser/${id}`, { headers: headers });
  }

}