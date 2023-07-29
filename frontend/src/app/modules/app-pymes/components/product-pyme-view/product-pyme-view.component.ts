import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Global } from 'src/app/shared/constants/Global';
import { Product } from 'src/app/shared/models/Product';

@Component({
  selector: 'app-product-pyme-view',
  templateUrl: './product-pyme-view.component.html',
  styleUrls: ['./product-pyme-view.component.css'],
})
export class ProductPymeViewComponent implements OnInit {
  constructor(private _router: Router) {}
  @Input() product!: Product;
  public url = Global.url;
  ngOnInit(): void {}
  redirect() {
    this._router.navigate(['PYME_HOME', 'Product', this.product._id]);
  }
}
