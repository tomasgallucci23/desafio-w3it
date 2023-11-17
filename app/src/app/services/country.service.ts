import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountriesModel } from '../models/CountriesModel';
import { CountryModel } from '../models/CountryModel';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private httpClient: HttpClient) {}
  getAllCountry(): Observable<CountryModel[]> {
    return this.httpClient
      .get<CountriesModel>(`${environment.baseUrl}/country`)
      .pipe(this.calculatePercentagePopulation());
  }

  filterCountry(countryPattern: string): Observable<CountryModel[]> {
    return this.httpClient
      .get<CountriesModel>(
        `${environment.baseUrl}/country/filter?country=${countryPattern}`,
        { observe: 'response' }
      )
      .pipe(
        map((res) => {
          if (res.status === 200) {
            return res.body!;
          }
          return { countries: [], total: 0 };
        })
      )
      .pipe(this.calculatePercentagePopulation());
  }

  private calculatePercentagePopulation() {
    return map(({ countries, total }: CountriesModel) => {
      if (!countries || !countries.length) {
        return [];
      }

      return countries.map((country) => ({
        _id: country._id,
        name: country.name,
        population: country.population,
        percentage: Number((country.population / total) * 100).toFixed(3),
      }));
    });
  }
}
