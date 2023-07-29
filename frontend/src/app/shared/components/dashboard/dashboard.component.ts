import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SesionService } from '../../services/Sesion.service';
import { Kart } from '../../models/Kart';
import { KartService } from '../../services/Kart.service';
import { User } from '../../models/User';
import { Pyme } from '../../models/Pyme';
import { Sesion } from '../../models/Sesion';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  
  constructor(
    private router: Router,
    public _sessionService: SesionService,
    private _kartService: KartService
  ) {}
  kart: Kart = new Kart(0, [], 0);
  ngOnInit(): void {
    let sessionKart = this._kartService.getCartSession();
    if (!this._sessionService.confirmOpenSesion()) {
      this.kart = sessionKart;
    } else {
      let session = this._sessionService.getCurrentUser();
      let type = this._sessionService.getCurrentType()
      if (type == Sesion.PYME) {
        this.router.navigateByUrl('/PYME_HOME/MyProducts');
        return;
      }
      if (sessionKart) {
        this._kartService
          .getCartServer(session?._id ? session?._id : '')
          .subscribe((server) => {
            this.kart = server.KART;
          });
      }
    }

    this._kartService.carritoState.subscribe((kartNext) => {
      this.kart = kartNext;
    });
  }
}
