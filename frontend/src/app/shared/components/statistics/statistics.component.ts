import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/Transaction.service';
import { SesionService } from '../../services/Sesion.service';
import { WalletService } from '../../services/Wallet.Service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  public data = {
    // values on X-Axis
    labels: new Array<string>(),
    datasets: [
      {
        label: 'Ingresos',
        data: new Array<number>(),
        backgroundColor: 'green',
      },
      {
        label: 'Retiros',
        data: new Array<number>(),
        backgroundColor: 'red',
      },
    ],
  };
  public load = false;
  constructor(
    private _transactionService: TransactionService,
    private _sesionService: SesionService,
    private _walletService: WalletService
  ) {}

  ngOnInit(): void {
    let sesion = this._sesionService.getCurrentUser();
    if (!sesion) {
      return;
    }
    this._walletService.getWallet(sesion._id).subscribe((response) => {
      this._transactionService
        .getTransactions(response.WALLET._id)
        .subscribe((resp) => {
          let transactions: Array<any> = resp.TRANSACTIONS;
          let mapValuePerDate: Map<string, Array<number>> = new Map();
          transactions.forEach((transaction) => {
            let auxDate: string = transaction.creationDate.split('T')[0];
            if (!mapValuePerDate.has(auxDate)) {
              this.data.labels.push(auxDate);
              mapValuePerDate.set(auxDate, [transaction.value]);
            } else {
              mapValuePerDate.get(auxDate)?.push(transaction.value);
            }
          });
          this.load = true;

          this.data.labels.forEach((value) => {
            let retiros = mapValuePerDate.get(value)?.filter((value, idex) => {
              return value < 0;
            });
            let ingresos = mapValuePerDate.get(value)?.filter((value, idex) => {
              return value > 0;
            });
            if (!retiros || retiros.length == 0) {
              this.data.datasets[1].data.push(0);
            } else {
              this.data.datasets[1].data.push(
                retiros?.reduce((prev, curr, currInd) => {
                  return prev + curr;
                })
              );
            }
            if (!ingresos || ingresos.length == 0) {
              this.data.datasets[0].data.push(0);
            } else {
              this.data.datasets[0].data.push(
                ingresos?.reduce((prev, curr, currInd) => {
                  return prev + curr;
                })
              );
            }
          });
        });
    });
  }
}
