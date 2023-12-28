import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';
import { TitleComponent } from '../../../shared/components/title/title.component';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { CountryService } from '../../services/country.service';
import { LoadingSpinnerComponent } from '@shared/loading-spinner/loading-spinner.component';
import { delay, tap } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  standalone: true,
  imports: [CommonModule, SearchBoxComponent, TitleComponent, CountryTableComponent, LoadingSpinnerComponent],
})
export class ByCountryPageComponent {

  private countryService = inject( CountryService );
  public isLoading : boolean = false;


  public countriesList = computed( () => this.countryService.cacheStore().termCountry.country );
  public countriesTag = computed( () => this.countryService.cacheStore().termCountry.term );

  newTag(tag: string){
    this.isLoading = true;
    this.countryService.searchTagByCountry( tag )
          .pipe(
            delay(1000),
            tap( () => this.isLoading = false )
          )
          .subscribe();
  }

  
}
