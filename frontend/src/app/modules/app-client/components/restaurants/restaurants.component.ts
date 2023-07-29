import { Component, OnInit } from '@angular/core';
import { Global } from 'src/app/shared/constants/Global';
import { Pyme } from 'src/app/shared/models/Pyme';
import { PymeService } from 'src/app/shared/services/Pyme.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
})
export class RestaurantsComponent implements OnInit {
  public pymes: Array<Pyme> = [];
  constructor(private _pymeService: PymeService) {}

  ngOnInit(): void {
    this._pymeService.getPymes().subscribe((res) => {
      if (res) {
        this.pymes = res.PYMES;
        this.pymes = this.pymes.filter((pyme, index) => {
          return pyme.category == Global.RESTAURANTS;
        });
      }
    });
  }
}
