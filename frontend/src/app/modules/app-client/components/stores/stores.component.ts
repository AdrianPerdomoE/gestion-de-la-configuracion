import { Component, OnInit } from '@angular/core';
import { Pyme } from '../../../../shared/models/Pyme';
import { PymeService } from '../../../../shared/services/Pyme.service';
import { Global } from '../../../../shared/constants/Global';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
})
export class StoresComponent implements OnInit {
  public pymes: Array<Pyme> = [];
  constructor(private _pymeService: PymeService) {}

  ngOnInit(): void {
    this._pymeService.getPymes().subscribe((res) => {
      if (res) {
        this.pymes = res.PYMES;
        this.pymes = this.pymes.filter((pyme, index) => {
          return pyme.category == Global.STORES;
        });
      }
    });
  }
}
