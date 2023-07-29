import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../constants/Global';
import { Investment } from '../models/Investment';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService {
  public url: string;
  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  registerInvestment(investment: Investment): Observable<any> {
    let params = JSON.stringify(investment);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}saveInvestment`, params, {
      headers: headers,
    });
  }

  getInvestment(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}getInvestment/${id}`, {
      headers: headers,
    });
  }

  getInvestmentsPyme(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}getInvestmentsPyme/${id}`, {
      headers: headers,
    });
  }
  getInvestmentsUser(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}getInvestmentsUser/${id}`, {
      headers: headers,
    });
  }
}
