import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { ShoppingKartComponent } from './components/shopping-kart/shopping-kart.component';
import { ShoppingKartItemComponent } from './components/shopping-kart-item/shopping-kart-item.component';
import { WalletViewComponent } from './components/wallet-view/wallet-view.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';


@NgModule({
  declarations: [
    DashboardComponent,
    TapToTopComponent,
    LoginComponent,
    ShoppingKartComponent,
    ShoppingKartItemComponent,
    WalletViewComponent,
    StatisticsComponent,
    BarChartComponent,
    LineChartComponent,
   
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    BrowserModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
  ],
  bootstrap: [],
  exports: [DashboardComponent, TapToTopComponent, LoginComponent],
})
export class SharedModule {}
