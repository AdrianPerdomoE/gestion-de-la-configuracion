import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Kart } from 'src/app/shared/models/Kart';
import { KartService } from 'src/app/shared/services/Kart.service';

@Component({
  selector: 'app-side-bar-client',
  templateUrl: './side-bar-client.component.html',
  styleUrls: ['./side-bar-client.component.css'],
})
export class SideBarClientComponent implements OnInit {
  constructor(private _router: Router,private KartService:KartService) {}

  ngOnInit(): void {
    this._router.navigate(['Profile', 'MyProfile']);
  }
  toggle() {
    let wrapper = document.getElementById('wrapper');
    if (wrapper) {
      wrapper.classList.toggle('toggled');
    }
  }
  cerrar() {
    sessionStorage.clear();
    this.KartService.saveCartSession(new Kart(0,[],0));
    this._router.navigateByUrl('/Home');
    
  }
}
