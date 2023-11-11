import { ChangeDetectorRef, Component } from '@angular/core';
import { CountryService } from './services/country.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  countries: { name: string; population: number; percentage: string }[] = [];

  searchCountry = new FormControl();
  constructor(private countryService: CountryService) {
    this.searchCountry.valueChanges.subscribe((res) => {
      if (!res || res.length < 1) {
        this.resetCountries();
        return;
      }
      this.filterCountry(res);
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
      if (pattern.length >= 3) {
        this.countries = res;
      }
    });
  }

  resetCountries() {
    this.countries = JSON.parse(localStorage.getItem('countries')!);
  }
}
