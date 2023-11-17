import ICountryModel from "../../dataAccess/models/abstracts/ICountryModel";

export interface ICountryRepository {
  getAll(): Promise<ICountryModel[]>;
  filter(
    condition: object,
    filter: object,
    options: object
  ): Promise<ICountryModel[]>;
}
