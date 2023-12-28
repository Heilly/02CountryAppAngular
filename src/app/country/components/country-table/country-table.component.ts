import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Country } from '../../interfaces/country.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-table',
  templateUrl: './country-table.component.html',
  standalone: true,
  imports: [CommonModule, RouterLink],
})
export class CountryTableComponent {

  @Input() countriesList! : Country[];

}
