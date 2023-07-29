import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PYMELogComponent } from './pages/pymelog/pymelog.component';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProductoComponent } from './components/producto/producto.component';
import { PymeDesignComponent } from './components/pyme-design/pyme-design.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ManagementPymeComponent } from './components/management-pyme/management-pyme.component';
import { RouterModule } from '@angular/router';
import { NavbarPymeComponent } from './components/navbar-pyme/navbar-pyme.component';
import { ProductPymeViewComponent } from './components/product-pyme-view/product-pyme-view.component';
import { ProfilePymeComponent } from './components/profile-pyme/profile-pyme.component';
import { RegisterPymeComponent } from './components/register-pyme/register-pyme.component';

@NgModule({
  declarations: [
    PYMELogComponent,
    ProductoComponent,
    PymeDesignComponent,
    EditProductComponent,
    AddProductComponent,
    ManagementPymeComponent,
    NavbarPymeComponent,
    ProductPymeViewComponent,
    ProfilePymeComponent,
    RegisterPymeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    FormsModule,
    RouterModule,
  ],
  exports: [PymeDesignComponent],
})
export class AppPYMESModule {}
