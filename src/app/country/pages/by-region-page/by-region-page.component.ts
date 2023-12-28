import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Region } from '../../interfaces/region.type';
import { CountryTableComponent } from '../../components/country-table/country-table.component';
import { CountryService } from '../../services/country.service';
import { LoadingSpinnerComponent } from '@shared/loading-spinner/loading-spinner.component';
import { delay, tap } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  standalone: true,
  imports: [CommonModule, CountryTableComponent, LoadingSpinnerComponent],
})
export class ByRegionPageComponent implements OnInit {
  
  private countryService = inject( CountryService )

  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public isLoading : boolean = false;


  public countryByRegions = computed( () => this.countryService.cacheStore().regionCountry.countries );
  public countryTag = computed( () => this.countryService.cacheStore().regionCountry.region );

  ngOnInit(): void {
      this.selectedRegion = this.countryTag()
  }
  searchByRegion( region : Region ){
    this.isLoading = true;

      this.selectedRegion = region;
      this.countryService.searchByRegion( region )
          .pipe(
            delay(1000),
            tap( () => this.isLoading = false )
          )
          .subscribe();
    
    
  }


}
