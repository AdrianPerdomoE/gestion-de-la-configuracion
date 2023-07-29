import { Component, Input, OnInit } from '@angular/core';
import { Global } from 'src/app/shared/constants/Global';
import { Pyme } from 'src/app/shared/models/Pyme';

@Component({
  selector: 'app-card-pyme',
  templateUrl: './card-pyme.component.html',
  styleUrls: ['./card-pyme.component.css'],
})
export class CardPymeComponent implements OnInit {
  @Input() pyme!: Pyme;
  public url = Global.url;
  constructor() {}

  ngOnInit(): void {}
}
