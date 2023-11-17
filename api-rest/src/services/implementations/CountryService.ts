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
    const mappedDTO = this.mapper.fromModelsToDTO(result);
    this.totalPopulation = mappedDTO.total;
    return mappedDTO;
  }

  async filterWithPattern(
    pattern: string,
    keyToFind: string
  ): Promise<ICountryDTO> {
    const result = await this.repository.filter(
      { [keyToFind]: new RegExp(pattern, "i") },
      { _id: 1, name: 1, population: 1 },
      { limit: 5 }
    );
    const mappedDTO = this.mapper.fromModelsToDTO(result);
    mappedDTO.total = this.totalPopulation;
    return mappedDTO;
  }
}
