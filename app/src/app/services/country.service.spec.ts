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

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve countries from the API and calculate percentage', () => {
    const mockCountries = {
      countries: [
        { _id: '1', name: 'Country1', population: 100 },
        { _id: '2', name: 'Country2', population: 200 },
      ],
      total: 300,
    };

    service.getAllCountry().subscribe((countries) => {
      expect(countries.length).toBe(2);
      expect(countries[0].percentage).toBe('33.333');
      expect(countries[1].percentage).toBe('66.667');
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/country`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCountries);
  });

  it('should filter countries based on countryPattern', () => {
    const countryPattern = 'Country';
    const mockFilteredCountries = {
      countries: [
        { _id: '1', name: 'Country1', population: 100 },
        { _id: '2', name: 'Country2', population: 200 },
      ],
      total: 300,
    };

    service.filterCountry(countryPattern).subscribe((countries) => {
      expect(countries.length).toBe(2);
      expect(countries[0].percentage).toBe('33.333');
      expect(countries[1].percentage).toBe('66.667');
    });

    const req = httpMock.expectOne(
      `${environment.baseUrl}/country/filter?country=${countryPattern}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockFilteredCountries);
  });
});
