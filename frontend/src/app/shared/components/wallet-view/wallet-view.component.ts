import { Component, OnInit } from '@angular/core';
import { Wallet } from '../../models/Wallet';
import { Transaction } from '../../models/Transaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SesionService } from '../../services/Sesion.service';
import { WalletService } from '../../services/Wallet.Service';
import { TransactionService } from '../../services/Transaction.service';
import { NotificationService } from '../../services/Notification.service';

@Component({
  selector: 'app-wallet-view',
  templateUrl: './wallet-view.component.html',
  styleUrls: ['./wallet-view.component.css'],
})
export class WalletViewComponent implements OnInit {
  public wallet: Wallet = new Wallet('', '', 0);
  transaciones: Array<Transaction> = [];
  public money: number = 100000;
  constructor(
    private modalService: NgbModal,
    private _sesionService: SesionService,
    private _walletService: WalletService,
    private _transactionService: TransactionService,
    private _notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    let sesion = this._sesionService.getCurrentUser();
    if (sesion) {
      this._walletService.getWallet(sesion._id).subscribe((res) => {
        if (res.WALLET) {
          this.wallet = res.WALLET;
          this._transactionService
            .getTransactions(res.WALLET._id)
            .subscribe((resp) => {
              if (resp.TRANSACTIONS) {
                this.transaciones = resp.TRANSACTIONS;
              }
            });
        }
      });
    }
  }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
  add(modal: any) {
    let newTransaction = new Transaction(
      '',
      this.wallet._id,
      this.money,
      'Ingreso por recarga de billetera virtual',
      new Date()
    );
    this._transactionService
      .registerTransaction(newTransaction)
      .subscribe((resp) => {
        if (resp.TRANSACTION) {
          this._notificationService.enviarAlerta(
            'success',
            'Recarga',
            'Su recarga por ' + this.money + '$ se ha efectuado correctamente'
          );
            this.ngOnInit();
        }
      
      });

    modal.close('Close click');
  }
}
