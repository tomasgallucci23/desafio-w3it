import CountryRepository from "../../repositories/implements/CountryRepository";
import CountryMapper from "../../dataAccess/mapper/implementations/CountryMapper";
import { ICountryMapper } from "../../dataAccess/mapper/abstracts/ICountryMapper";
import { ICountryRepository } from "../../repositories/abstracts/ICountryRepository";
import { ICountryService } from "../abstracts/ICountryService";
import { ICountryDTO } from "../../dataAccess/dto/abstracts/ICountryDTO";

export default class CountryService implements ICountryService {
  repository: ICountryRepository;
  mapper: ICountryMapper;
  totalPopulation: number;
  constructor() {
    this.repository = new CountryRepository();
    this.mapper = new CountryMapper();
  }

  async getAll(): Promise<ICountryDTO> {
    const result = await this.repository.getAll();
    return this.mapper.fromModelsToDTO(result);
  }

  async filterByPattern(pattern: string): Promise<ICountryDTO> {
    const result = await this.getAll();

    result.countries = result.countries.filter((country) =>
      country.name.includes(pattern)
    );

    return result;
  }
}
