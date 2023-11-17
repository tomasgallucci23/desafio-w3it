import { ICountryDTO } from "../../dataAccess/dto/abstracts/ICountryDTO";

export interface ICountryService {
  getAll(): Promise<ICountryDTO>;

  filterWithPattern(pattern: string, keyToFind: string): Promise<ICountryDTO>;
}
