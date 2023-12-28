import { Country, Languages } from '../../interfaces/country.interface';
import { Component, Input, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { switchMap, tap } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class CountryComponent {
  Object: any;
  
  private activatedRoute = inject( ActivatedRoute );
  private countryService = inject( CountryService );
  public countryCurrent?: Country | null;
  public languages? : Languages

  @Input() country! : Country;

  constructor() {
    
    this.activatedRoute.params
          .pipe(
            switchMap( (__values) => {
              console.log(__values);
              return this.countryService.searchByAlphaCode( __values['id'])
            } )
          )
          .subscribe( country => {            
            console.log(country);
            this.languages = country?.languages
            return this.countryCurrent = country;
          })

  }
}
