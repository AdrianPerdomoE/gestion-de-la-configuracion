import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientViewComponent } from './pages/client-view/client-view.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { CardPymeComponent } from './components/card-pyme/card-pyme.component';
import { ListPymesComponent } from './components/list-pymes/list-pymes.component';
import { AppPYMESModule } from '../app-pymes/app-pymes.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SideBarClientComponent } from './components/side-bar-client/side-bar-client.component';
import { RestaurantsComponent } from './components/restaurants/restaurants.component';
import { StoresComponent } from './components/stores/stores.component';
import { MarketsComponent } from './components/markets/markets.component';

@NgModule({
  declarations: [
    ClientViewComponent,
    RegisterComponent,
    HomeComponent,
    ListPymesComponent,
    CardPymeComponent,
    ProfileComponent,
    SideBarClientComponent,
    RestaurantsComponent,
    MarketsComponent,
    StoresComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppPYMESModule,
  ],
})
export class AppClientModule {}
