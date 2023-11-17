import ICountryModel from "../../models/abstracts/ICountryModel";

export interface ICountryDTO {
  countries: ICountryModel[];
  total: number;
}
