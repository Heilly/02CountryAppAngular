import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBoxComponent } from '@shared/search-box/search-box.component';
import { TitleComponent } from '@shared/title/title.component';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { CountryService } from '../../services/country.service';
import { LoadingSpinnerComponent } from '@shared/loading-spinner/loading-spinner.component';
import { delay, tap } from 'rxjs';

@Component({
  selector: 'app-by-capitap-page',
  templateUrl: './by-capital-page.component.html',
  standalone: true,
  imports: [CommonModule, SearchBoxComponent, TitleComponent, CountryTableComponent, LoadingSpinnerComponent],
})
export class ByCapitapPageComponent {

  public countryService = inject( CountryService );
  public isLoading : boolean = false;

  public capitalList = computed(() => this.countryService.cacheStore().termCapital.country);
  public capitalTag = computed( () => this.countryService.cacheStore().termCapital.term );

  newTag(tag : string){
    this.isLoading = true;
    this.countryService.searchTagCapital( tag )
          .pipe(
            delay(1000),
            tap( () => this.isLoading = false )
          )
          .subscribe();
  }
}
