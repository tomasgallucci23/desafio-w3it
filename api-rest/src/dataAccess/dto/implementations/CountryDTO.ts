import ICountryModel from "../../models/abstracts/ICountryModel";
import CountryModel from "../../models/implementation/CountryModel";
import { ICountryDTO } from "../abstracts/ICountryDTO";

export class CountryDTO implements ICountryDTO {
  countries: CountryModel[];
  total: number;

  constructor(countries: CountryModel[]) {
    this.total = countries.reduce(
      (total: number, { population }) => total + population,
      0
    );
    this.countries = countries;
  }
}
