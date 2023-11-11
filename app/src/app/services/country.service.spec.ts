import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CountryService } from './country.service';
import { environment } from 'src/environments/environment';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService],
    });
    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve countries from the API', () => {
    const mockCountries = [
      { name: 'Country 1', population: 1000000, percentage: '33.333' },
      { name: 'Country 2', population: 2000000, percentage: '66.667' },
    ];

    service.getAllCountry().subscribe((countries) => {
      expect(countries).toEqual(mockCountries);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/country`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);

    httpMock.verify();
  });

  it('should filter countries based on countryPattern', () => {
    const countryPattern = 'pattern';
    const mockFilteredCountries = [
      { name: 'Country 1', population: 1000000, percentage: '33.333' },
      { name: 'Country 2', population: 2000000, percentage: '66.667' },
    ];

    service.filterCountry(countryPattern).subscribe((filteredCountries) => {
      expect(filteredCountries).toEqual(mockFilteredCountries);
    });

    const req = httpMock.expectOne(
      `${environment.baseUrl}/country/filter?country=${countryPattern}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockFilteredCountries);

    httpMock.verify();
  });
});
