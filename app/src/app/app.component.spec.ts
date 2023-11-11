import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { CountryService } from './services/country.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let countryService: jasmine.SpyObj<CountryService>;

  const mockCountries = [
    { name: 'Country 1', population: 1000000, percentage: '10%' },
    { name: 'Country 2', population: 2000000, percentage: '20%' },
  ];

  beforeEach(() => {
    countryService = jasmine.createSpyObj('CountryService', [
      'getAllCountry',
      'filterCountry',
    ]);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: CountryService, useValue: countryService }],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    countryService.getAllCountry.and.returnValue(of(mockCountries));
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch countries on ngOnInit', () => {
    countryService.getAllCountry.and.returnValue(of(mockCountries));

    fixture.detectChanges();

    expect(component.countries).toEqual(mockCountries);
  });

  it('should reset countries when search input is less than 3 characters', () => {
    component.countries = mockCountries;

    component.searchCountry.setValue('ab');

    component.resetCountries();
    fixture.whenStable().then(() => {
      expect(component.countries).toEqual(mockCountries);
    });
  });

  it('should filter countries when search input has 3 or more characters', () => {
    countryService.filterCountry.and.returnValue(of([]));

    component.countries = mockCountries;

    component.filterCountry('abc');
    expect(component.countries).toEqual([]);
  });

  it('should see all countries when clean input', () => {
    countryService.filterCountry.and.returnValue(of([]));

    component.countries = mockCountries;

    component.filterCountry('abc');
    component.searchCountry.setValue('');

    expect(component.countries).toEqual(mockCountries);
  });
});
