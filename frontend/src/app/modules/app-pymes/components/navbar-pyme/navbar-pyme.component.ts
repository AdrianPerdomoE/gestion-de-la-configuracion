import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pyme } from 'src/app/shared/models/Pyme';
import { Sesion } from 'src/app/shared/models/Sesion';
import { SesionService } from 'src/app/shared/services/Sesion.service';

@Component({
  selector: 'app-navbar-pyme',
  templateUrl: './navbar-pyme.component.html',
  styleUrls: ['./navbar-pyme.component.css'],
})
export class NavbarPymeComponent implements OnInit {
  constructor(private _router: Router, private _sesionService: SesionService) {}

  ngOnInit(): void {
    let session = this._sesionService.getCurrentUser();
    let type = this._sesionService.getCurrentType()
      if (!(type == Sesion.PYME)) {
      this._router.navigateByUrl('/Home');
      return;
    }
    this._router.navigate(['PYME_HOME', 'MyProducts']);
  }
  cerrar() {
    sessionStorage.clear();
    this._router.navigateByUrl('/Home');
  }
}
