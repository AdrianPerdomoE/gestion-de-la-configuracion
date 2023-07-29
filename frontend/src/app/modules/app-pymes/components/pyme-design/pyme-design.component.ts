import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-pyme-design',
  templateUrl: './pyme-design.component.html',
  styleUrls: ['./pyme-design.component.css'],
})
export class PymeDesignComponent implements OnInit {
  indice: string;
  id: string;
  productos = [];
  constructor(
    private _router: Router,
    private actRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    this.indice = this.actRoute.snapshot.params['name'];
    this.id = this.actRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProductsOwner(this.id).subscribe((response) => {
      if (response.PRODUCTS) {
        this.productos = response.PRODUCTS;
      }
    });
  }
}
