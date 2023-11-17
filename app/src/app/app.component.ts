import { ChangeDetectorRef, Component } from '@angular/core';
import { CountryService } from './services/country.service';
import { FormControl } from '@angular/forms';
import { CountryModel } from './models/CountryModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  countries: CountryModel[] = [];

  searchCountry = new FormControl('');

  constructor(private countryService: CountryService) {
    this.searchCountry.valueChanges.subscribe((res) => {
      if (!res || res.length < 1) {
        this.resetCountries();
        return;
      }
    });
  }

  ngOnInit() {
    this.getAllCountries();
  }

  getAllCountries() {
    this.countryService.getAllCountry().subscribe((res) => {
      this.countries = res;
      localStorage.setItem('countries', JSON.stringify(res));
    });
  }

  filterCountry(pattern: string) {
    this.countryService.filterCountry(pattern).subscribe((res) => {
      this.countries = res;
    });
  }

  btnSearchCountry() {
    const res = this.searchCountry.getRawValue();
    this.filterCountry(res || '');
  }

  resetCountries() {
    this.countries = JSON.parse(localStorage.getItem('countries')!);
  }
}
