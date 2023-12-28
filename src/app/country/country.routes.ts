import { Route, Routes } from '@angular/router';
import { ByCapitapPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { CountryComponent } from './pages/country/country.component';

// import { CountryComponent } from './country.component';

export const COUNTRY_ROUTES: Routes = [
  {
    path: 'country',
    component: LayoutComponent,
    children: [
      { path: 'by-capital', title: 'By Capital', component: ByCapitapPageComponent },
      { path: 'by-country', title: 'By Country', component: ByCountryPageComponent },
      { path: 'by-region', title: 'By Region',component: ByRegionPageComponent },
      { path: 'by/:id', component: CountryComponent },
      { path: '**', redirectTo: 'by-country',pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'country',pathMatch: 'full' }
  
 ]satisfies Route[];
