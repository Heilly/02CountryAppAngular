import { Routes } from '@angular/router';

export const routes: Routes = [
   {
    path: '',
    loadChildren: () => import('./country/country.routes').then( m => m.COUNTRY_ROUTES )
   },
   { path: '**', redirectTo:'', pathMatch: 'full' }

];
