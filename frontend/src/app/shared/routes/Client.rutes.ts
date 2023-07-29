import { Routes } from '@angular/router';


export const client_rutes: Routes = [
  {
    path: '',
    loadChildren: () => import('../../modules/app-client//app-client.module').then(m => m.AppClientModule)
  },  
];
