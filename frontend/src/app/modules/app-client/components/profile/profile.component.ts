import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/User';
import { SesionService } from 'src/app/shared/services/Sesion.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user:any;
  constructor(private _sesionService:SesionService) { 
    this.user = this._sesionService.getCurrentUser();
  }

  ngOnInit(): void {
  }

}
