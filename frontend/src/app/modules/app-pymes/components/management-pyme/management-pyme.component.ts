import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/shared/services/Sesion.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-management-pyme',
  templateUrl: './management-pyme.component.html',
  styleUrls: ['./management-pyme.component.css'],
})
export class ManagementPymeComponent implements OnInit {
  public products = [];
  constructor(
    private ProductService: ProductService,
    private SessionService: SesionService
  ) {}

  ngOnInit(): void {
    let session = this.SessionService.getCurrentUser();
    if (!session) {
      return;
    }
    this.ProductService.getProductsOwner(session._id).subscribe((resp) => {
      if (resp.PRODUCTS) {
        this.products = resp.PRODUCTS;
      }
    });
  }
}
