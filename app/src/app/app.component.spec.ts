import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CountryService } from './services/country.service';
import { CountryModel } from './models/CountryModel';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let countryService: jasmine.SpyObj<CountryService>;

  beforeEach(() => {
    const countryServiceSpy = jasmine.createSpyObj('CountryService', [
      'getAllCountry',
      'filterCountry',
    ]);

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: CountryService, useValue: countryServiceSpy }],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    countryService = TestBed.inject(
      CountryService
    ) as jasmine.SpyObj<CountryService>;
  });

  it('should be return all countries when start component', () => {
    const mockCountries: CountryModel[] = [
      { _id: 1, name: 'Country1', population: 100, percentage: '33.333' },
      { _id: 2, name: 'Country2', population: 200, percentage: '66.666' },
    ];

    countryService.getAllCountry.and.returnValue(of(mockCountries));

    fixture.detectChanges();

    expect(component.countries).toEqual(mockCountries);
  });

  it('should be filter countries when input changes and click button', fakeAsync(() => {
    const mockFilteredCountries: CountryModel[] = [
      {
        _id: 1,
        name: 'Filter Country 1',
        population: 150,
        percentage: '37.500',
      },
      {
        _id: 2,
        name: 'Filter Country 2',
        population: 250,
        percentage: '62.500',
      },
    ];

    component.countries = mockFilteredCountries;

    const filterBy = 'Filter Country 1';

    const filtered = mockFilteredCountries.find(
      (country) => country.name == filterBy
    );

    const mockedResult = filtered ? [filtered] : [];

    countryService.filterCountry.and.returnValue(of(mockedResult));

    component.searchCountry.setValue(filterBy);
    const btn: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    btn.click();
    tick();
    expect(component.countries).toEqual(mockedResult);
  }));

  it('should be reset countries from localStorage', () => {
    const mockStoredCountries: CountryModel[] = [
      {
        _id: 1,
        name: 'StoredCountry1',
        population: 120,
        percentage: '35.294',
      },
      {
        _id: 2,
        name: 'StoredCountry2',
        population: 220,
        percentage: '64.706',
      },
    ];

    localStorage.setItem('countries', JSON.stringify(mockStoredCountries));

    component.resetCountries();

    expect(component.countries).toEqual(mockStoredCountries);
  });

  it('should be call filterCountry when button is clicked', () => {
    const filterCountrySpy = spyOn(component, 'filterCountry');

    component.searchCountry.setValue('Search');
    const btn: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    btn.click();
    component.btnSearchCountry();

    expect(filterCountrySpy).toHaveBeenCalledWith('Search');
  });
});
