import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../constants/Global';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }
  getWallet(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}getWallet/${id}`, { headers: headers });
  }
}
