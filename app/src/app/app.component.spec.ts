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

  it('debería obtener todos los países al inicializar el componente', () => {
    const mockCountries: CountryModel[] = [
      { _id: 1, name: 'Country1', population: 100, percentage: '33.333' },
      { _id: 2, name: 'Country2', population: 200, percentage: '66.666' },
    ];

    countryService.getAllCountry.and.returnValue(of(mockCountries));

    fixture.detectChanges();

    expect(component.countries).toEqual(mockCountries);
  });

  it('debería filtrar países al cambiar el valor del campo de búsqueda', fakeAsync(() => {
    const mockFilteredCountries: CountryModel[] = [
      { _id: 1, name: 'Country1', population: 150, percentage: '37.500' },
      { _id: 2, name: 'Country2', population: 250, percentage: '62.500' },
    ];

    countryService.filterCountry.and.returnValue(of(mockFilteredCountries));

    component.searchCountry.setValue('Filter');
    const btn: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    btn.click();
    // Espera a que se resuelva la promesa
    tick();

    expect(component.countries).toEqual(mockFilteredCountries);
  }));

  it('debería restablecer los países desde el almacenamiento local', () => {
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

  it('debería llamar a filterCountry al hacer clic en el botón de búsqueda', () => {
    const filterCountrySpy = spyOn(component, 'filterCountry');

    component.searchCountry.setValue('Search');
    const btn: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');
    btn.click();
    component.btnSearchCountry();

    expect(filterCountrySpy).toHaveBeenCalledWith('Search');
  });
});
