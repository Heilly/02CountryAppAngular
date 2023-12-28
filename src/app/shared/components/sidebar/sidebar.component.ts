import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routes } from '../../../app.routes';
import { COUNTRY_ROUTES } from '../../../country/country.routes';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  standalone: true,
  imports: [CommonModule,RouterLink, RouterLinkActive, RouterModule],
})
export class SidebarComponent {

  private active = inject( Router);

  public ruta!: string;
  public menuItems = COUNTRY_ROUTES
                      .map( route => route.children ?? [] )
                      .flat()
                      .filter( route => route && route.path )
                      .filter( route => !route.path?.includes(':') );
  public routeActive = signal<boolean>(false);
  
  constructor(){
    
  }


}
