import { Component, OnInit } from '@angular/core';
import { Kart } from '../../models/Kart';
import { SesionService } from '../../services/Sesion.service';
import { KartService } from '../../services/Kart.service';
import { KartItem } from '../../models/KartItem';
import { WalletService } from '../../services/Wallet.Service';
import { User } from '../../models/User';
import { NotificationService } from '../../services/Notification.service';
import { Wallet } from '../../models/Wallet';
import { Transaction } from '../../models/Transaction';
import { TransactionService } from '../../services/Transaction.service';
import { Sesion } from '../../models/Sesion';

@Component({
  selector: 'app-shopping-kart',
  templateUrl: './shopping-kart.component.html',
  styleUrls: ['./shopping-kart.component.css'],
})
export class ShoppingKartComponent implements OnInit {
  kart: Kart = new Kart(0, [], 0);
  address = '';
  constructor(
    private _sessionService: SesionService,
    private _kartService: KartService,
    private _walletService: WalletService,
    private _notificationService: NotificationService,
    private _transactionService: TransactionService
  ) {}

  ngOnInit(): void {
    let sessionKart = this._kartService.getCartSession();
    if (!this._sessionService.confirmOpenSesion()) {
      this.kart = sessionKart;
    } else {
      let session = this._sessionService.getCurrentUser();
      if (sessionKart) {
        this._kartService
          .getCartServer(session?._id ? session?._id : '')
          .subscribe((server) => {
            let kartServer = server.KART;
            if (kartServer) {
              this._kartService.mixKarts(kartServer);
              this._kartService
                .updateCarServer(kartServer)
                .subscribe((resp) => {
                  this.kart = resp.KART;
                });
            }
          });
      }
    }

    this._kartService.carritoState.subscribe((kartNext) => {
      this.kart = kartNext;
    });
  }
  remove(index: number) {
    let sessionKart = this._kartService.getCartSession();
    this._kartService.removeCartItem(index, this.kart);
    if (this._sessionService.confirmOpenSesion()) {
      this._kartService.updateCarServer(this.kart).subscribe((res) => {
        if (res.KART) {
          this._kartService.carritoState.next(res.KART);
        }
      });
    } else {
      this._kartService.updateCarSession(this.kart);
    }
  }
  pay() {
    let session = this._sessionService.getCurrentUser();
    let type = this._sessionService.getCurrentType();
    if (!(type == Sesion.USER)) {
      this._notificationService.enviarAlerta(
        'warning',
        'Error durante pago',
        'Para realizar el pago de su carrito por favor inicie sesion en la aplicacion.'
      );
      return;
    }
    if (!session) {
      return;
    }
    this._walletService.getWallet(session._id).subscribe((rsp) => {
      if (rsp.WALLET) {
        let wallet: Wallet = rsp.WALLET;
        if (wallet.money < this.kart.toPay) {
          this._notificationService.enviarAlerta(
            'error',
            'Error durante el pago',
            'No tiene saldo suficiente para realizar la compra'
          );
          return;
        } else {
          let shoppingDict: Map<string, Array<KartItem>> = new Map();
          this.fillDict(shoppingDict);
          let clientDetail = this.makeShoppingDetailClient(shoppingDict);
          let clientTransaction: Transaction = new Transaction(
            '',
            wallet._id,
            -this.kart.toPay,
            clientDetail,
            new Date()
          );
          this._kartService.emptyCartServer(this.kart).subscribe((respo) => {
            if (respo.KART) {
              this._kartService.carritoState.next(respo.KART);
            }
          });
          this._transactionService
            .registerTransaction(clientTransaction)
            .subscribe((res) => {
              if (res.TRANSACTION) {
                this._notificationService.enviarAlerta(
                  'success',
                  'Pago exitoso',
                  'Su paga se ha realizado efectivamente'
                );
                shoppingDict.forEach((value, key) => {
                  this._walletService.getWallet(key).subscribe((response) => {
                    if (response.WALLET) {
                      let pymeWallet: Wallet = response.WALLET;
                      let transaction = this.makeTransactionPyme(
                        value,
                        pymeWallet
                      );
                      this._transactionService
                        .registerTransaction(transaction)
                        .subscribe((r) => {});
                    }
                  });
                });
              }
            });
        }
      }
    });
  }
  private fillDict(dict: Map<string, Array<KartItem>>) {
    this.kart.items.forEach((item) => {
      let key = `${item.product.pyme_id}`;
      if (dict.has(key)) {
        dict.get(key)?.push(item);
      } else {
        dict.set(key, [item]);
      }
    });
  }
  private makeShoppingDetailClient(dict: Map<string, Array<KartItem>>): String {
    let text: String = 'Retiro por compra en la plataforma PYME YA  de:\n';
    dict.forEach((value, key) => {
      let firstItem = value.at(0);
      if (firstItem) {
        text += firstItem.storeName + '\n';
      }
      let auxText = '';
      value.forEach((item) => {
        auxText += `-> Producto: ${item.product.name} Unidades: ${item.amount} Precio: ${item.product.price}$\n`;
      });
      text += auxText;
    });
    return text;
  }
  private makeTransactionPyme(items: Array<KartItem>, wallet: Wallet) {
    let text = 'Ingreso por compra de:\n';
    let toPay = 0;
    items.forEach((item) => {
      text += `-> Producto: ${item.product.name} Unidades: ${item.amount} Precio: ${item.product.price}$\n`;
      toPay += item.amount * item.product.price;
    });
    return new Transaction('', wallet._id, toPay, text, new Date());
  }
}
