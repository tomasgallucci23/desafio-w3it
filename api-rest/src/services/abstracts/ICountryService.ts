import { ICountryDTO } from "../../dataAccess/dto/abstracts/ICountryDTO";

export interface ICountryService {
  getAll(): Promise<ICountryDTO>;

  filterByPattern(pattern: string): Promise<ICountryDTO>;
}
