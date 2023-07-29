import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Kart } from '../models/Kart';
import { Global } from '../constants/Global';
import { KartItem } from '../models/KartItem';
import { Product } from '../models/Product';
import { SesionService } from './Sesion.service';

@Injectable({
  providedIn: 'root',
})
export class KartService {
  public url: string;
  constructor(
    private _http: HttpClient,
    private _sessionService: SesionService
  ) {
    this.url = Global.url;
  }

  public carritoState = new Subject<Kart>();
  saveCartServer(kart: Kart): Observable<any> {
    let params = JSON.stringify(kart);
    let id = this._sessionService.getCurrentUser()?._id;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(`${this.url}updateKart/${id}`, params, {
      headers: headers,
    });
  }
  saveCartSession(kart: Kart): void {
    let kartString = JSON.stringify(kart);
    localStorage.setItem(Global.KART, kartString);
    this.carritoState.next(kart);
  }

  getCartServer(id: string): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}getKart/${id}`, { headers: headers });
  }

  getCartSession(): Kart {
    let kartString = localStorage.getItem(Global.KART);
    if (kartString == null) {
      let newKart = new Kart(0, [], 0);
      this.saveCartSession(newKart);
      return newKart;
    }
    let kart = JSON.parse(kartString);
    this.carritoState.next(kart);
    return kart;
  }

  updateCarServer(kart: Kart): Observable<any> {
    this.carritoState.next(kart);
    let params = JSON.stringify(kart);
    let id = this._sessionService.getCurrentUser()?._id;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(`${this.url}updateKart/${id}`, params, {
      headers: headers,
    });
  }

  updateCarSession(kart: Kart): void {
    this.carritoState.next(kart);
    let kartString = JSON.stringify(kart);
    localStorage.setItem(Global.KART, kartString);
  }
  calculateNewToPay(kart: Kart) {
    if (kart.items.length == 0) {
      kart.toPay = 0;
      return;
    }
    kart.toPay = kart.items
      .map((itm) => {
        return itm.amount * itm.product.price;
      })
      .reduce((prev, curr) => {
        return curr + prev;
      });
  }
  emptyCartServer(kart: Kart): Observable<any> {
    let newKart = new Kart(0, [], 0);
    this.carritoState.next(newKart);
    let params = JSON.stringify(newKart);
    let id = this._sessionService.getCurrentUser()?._id;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(`${this.url}updateKart/${id}`, params, {
      headers: headers,
    });
  }
  emptyCartSession(kart: Kart): void {
    let newKart = new Kart(0, [], 0);
    this.carritoState.next(newKart);
    let kartString = JSON.stringify(kart);
    localStorage.setItem(Global.KART, kartString);
  }

  mixKarts(kartServer: Kart): void {
    let kartString = localStorage.getItem(Global.KART);
    if (kartString == null) {
      this.carritoState.next(kartServer);
      return;
    }
    let kart: Kart = JSON.parse(kartString);
    kart.items.forEach((item) => {
      this.addCarItem(
        item.product,
        item.amount,
        item.storeName,
        '',
        kartServer
      );
    });
    localStorage.removeItem(Global.KART);
    this.carritoState.next(kartServer);
  }
  changeAmount(index: number, amount: number, kart: Kart): Kart {
    let cartItem = kart.items.at(index);

    if (!cartItem) return kart;
    if (amount === 0) {
      this.removeCartItem(index, kart);
    } else {
      kart.amountItems += amount - cartItem?.amount;
      cartItem.amount = amount;
    }
    this.calculateNewToPay(kart);
    return kart;
  }

  removeCartItem(index: number, kart: Kart): void {
    let amount = kart.items.at(index)?.amount;
    kart.amountItems -= amount ? amount : 0;
    kart.items = kart.items.filter((item, ind) => {
      return ind != index;
    });
    this.calculateNewToPay(kart);
  }

  addCarItem(
    product: Product,
    amount: number,
    storeName: string,
    storeId: string,
    kart: Kart
  ): Kart {
    kart.amountItems += amount;
    let result = this.lookForItem(product, kart);
    if (this.lookForItem(product, kart) >= 0) {
      kart.items[result].amount += amount;
      this.calculateNewToPay(kart);
      return kart;
    }
    let newKartItem = new KartItem(product, amount, storeName);
    kart.items.push(newKartItem);
    this.calculateNewToPay(kart);
    return kart;
  }

  private lookForItem(product: Product, kart: Kart): number {
    for (let index = 0; index < kart.items.length; index++) {
      if (kart.items[index].product._id == product._id) {
        return index;
      }
    }
    return -1;
  }
}
