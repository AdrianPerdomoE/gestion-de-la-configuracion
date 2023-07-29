import { Component, Input, OnInit } from '@angular/core';
import { Global } from 'src/app/shared/constants/Global';
import { Kart } from 'src/app/shared/models/Kart';
import { Product } from 'src/app/shared/models/Product';
import { KartService } from 'src/app/shared/services/Kart.service';
import { SesionService } from 'src/app/shared/services/Sesion.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
})
export class ProductoComponent implements OnInit {
  @Input() product!: Product;
  @Input() pymeName!: string;
  public url = Global.url;
  constructor(
    private _kartService: KartService,
    private _sessionService: SesionService
  ) {}

  ngOnInit(): void {}
  addItem(amount: string) {
    if (this._sessionService.confirmOpenSesion()) {
      let session = this._sessionService.getCurrentUser();
      this._kartService
        .getCartServer(session?._id ? session._id : '')
        .subscribe((resp) => {
          if (resp.KART) {
            this._kartService.addCarItem(
              this.product,
              Number(amount),
              this.pymeName,
              '',
              resp.KART
            );
            this._kartService.updateCarServer(resp.KART).subscribe((res) => {
              this._kartService.carritoState.next(res.KART);
            });
          }
        });
    } else {
      let kart = this._kartService.getCartSession();

      this._kartService.addCarItem(
        this.product,
        Number(amount),
        this.pymeName,
        '',
        kart
      );
      this._kartService.updateCarSession(kart);
    }
  }
}
