import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../constants/Global';
import { Pyme } from '../models/Pyme';

@Injectable({
  providedIn: 'root',
})
export class PymeService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  registerPyme(Pyme: Pyme): Observable<any> {
    let params = JSON.stringify(Pyme);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}savePyme`, params, { headers: headers });
  }

  getPyme(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}getPyme/${id}`, { headers: headers });
  }

  getPymes(): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}getPymes`, { headers: headers });
  }
  getPymesByCategory(searchBy:string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}getPymesByCategory/${searchBy}`, { headers: headers });
  }
  updatePyme(pyme: Pyme): Observable<any> {
    let body = JSON.stringify(pyme);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(`${this.url}updatePyme/${pyme._id}`, body, {
      headers: headers,
    });
  }

  emailExistence(email: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}getExistencePyme/${email}`, {
      headers: headers,
    });
  }

  confirmPassword(email: string, password: string): Observable<any> {
    let body = JSON.stringify({ email, password });
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}confirmPasswordPyme`, body, {
      headers: headers,
    });
  }
}
