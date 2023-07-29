import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Global } from 'src/app/shared/constants/Global';
import { Product } from 'src/app/shared/models/Product';
import { UploadFileService } from 'src/app/shared/services/UploadFileService';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  public title: string;
  public product: Product;
  public status: string;
  public filesToUpload: Array<File>;
  public url: string;
  public selecionado?: any;
  public showErrorMessage: boolean = false;
  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _uploadFileService: UploadFileService
  ) {
    this.title = 'Editar Producto';
    this.status = '';
    this.filesToUpload = new Array<File>();
    this.product = new Product(
      '',
      '',
      '',
      0,
      '',
      0,
      true,
      new Date(),
      new Date(),
      ''
    );
    this.url = Global.url;
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this.getProduct(id);
    });
  }

  getProduct(id: string) {
    this._productService.getProduct(id).subscribe((response) => {
      this.product = response.PRODUCT;
    });
  }

  onSubmit() {
    this._productService.updateProduct(this.product).subscribe({
      next: (response) => {
        if (response.PRODUCT) {
          if (this.filesToUpload.length >= 1) {
            console.log(this.url)
            this._uploadFileService
              .makeFileRequest(
                `${this.url}UploadImagen/${this.product._id}`,
                [],
                this.filesToUpload,
                'image'
              )
              .then((result: any) => {});
          }
          this.status = 'Success';
        } else {
          this.status = 'Failed';
        }
        scrollTo(0, 0);
      },
      error(err: any): void {
        console.log(<any>err);
      },
      complete(): void {},
    });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
}
