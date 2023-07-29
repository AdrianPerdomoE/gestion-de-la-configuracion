import { Component, Input, OnInit } from '@angular/core';
import { KartItem } from '../../models/KartItem';
import { Suscription } from '../../models/Suscription';
import { KartService } from '../../services/Kart.service';
import { SesionService } from '../../services/Sesion.service';
import { Kart } from '../../models/Kart';
import { Global } from '../../constants/Global';

@Component({
  selector: 'app-shopping-kart-item',
  templateUrl: './shopping-kart-item.component.html',
  styleUrls: ['./shopping-kart-item.component.css'],
})
export class ShoppingKartItemComponent implements OnInit {
  @Input() kartItem!: KartItem;
  @Input() kart!: Kart;
  @Input() index!: number;
  public url = Global.url;
  constructor(
    private _kartService: KartService,
    private _sessionService: SesionService
  ) {}

  ngOnInit(): void {}
  change_amount(value: number) {
    this.kart = this._kartService.changeAmount(
      this.index,
      value + this.kartItem.amount,
      this.kart
    );

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
}
