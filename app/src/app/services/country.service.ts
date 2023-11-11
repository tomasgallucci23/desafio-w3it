import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private httpClient: HttpClient) {}
  totalPopulation: number = 0;
  getAllCountry() {
    return this.httpClient
      .get<{ name: string; population: number }[]>(
        `${environment.baseUrl}/country`
      )
      .pipe(this.calculateTotalPopulation())
      .pipe(this.calculatePercentagePopulation());
  }

  filterCountry(countryPattern: string) {
    return this.httpClient
      .get<{ name: string; population: number }[]>(
        `${environment.baseUrl}/country/filter?country=${countryPattern}`,
        { observe: 'response' }
      )
      .pipe(
        map((res) => {
          if (res.status === 200) {
            return res.body!;
          }
          return [];
        })
      )
      .pipe(this.calculateTotalPopulation())
      .pipe(this.calculatePercentagePopulation());
  }

  private calculateTotalPopulation() {
    return map((res: any[]) => {
      if (!res || !res.length) {
        return [];
      }
      this.totalPopulation = res.reduce(
        (total: number, country: { population: number }) =>
          total + country.population,
        0
      );
      return res;
    });
  }

  private calculatePercentagePopulation() {
    return map((res: any[]) => {
      if (!res || !res.length) {
        return [];
      }
      return res.map((country) => ({
        name: country.name,
        population: country.population,
        percentage: Number(
          (country.population / this.totalPopulation) * 100
        ).toFixed(3),
      }));
    });
  }
}
