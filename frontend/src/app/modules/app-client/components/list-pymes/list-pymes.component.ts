import { Component, OnInit } from '@angular/core';
import { Pyme } from 'src/app/shared/models/Pyme'; 
import { PymeService } from 'src/app/shared/services/Pyme.service';

@Component({
  selector: 'app-list-pymes',
  templateUrl: './list-pymes.component.html',
  styleUrls: ['./list-pymes.component.css'],
})
export class ListPymesComponent implements OnInit {
  public pymes: Array<Pyme> = [];
  constructor(private _pymeService: PymeService) {}

  ngOnInit(): void {
    this._pymeService.getPymes().subscribe((res) => {
      if (res) {
        this.pymes = res.PYMES;
      }
    });
  }
}
