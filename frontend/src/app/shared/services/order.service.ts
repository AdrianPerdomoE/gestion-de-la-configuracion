import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "../constants/Global";
import { Order } from "../models/Order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = Global.url;
  }

  registerOrder(order: Order): Observable<any> {
    let params = JSON.stringify(order)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(`${this.url}saveOrder`, params, { headers: headers })
  }

  getOrders(): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.get(`${this.url}getOrders`, { headers: headers });
  }

  getOrder(id: string): Observable<any> {
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.get(`${this.url}getOrder/${id}`, { headers: headers });
  }
}
