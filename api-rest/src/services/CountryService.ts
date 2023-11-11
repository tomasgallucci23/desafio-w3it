import CountryModel from "../dataAccess/models/implementation/CountryModel";
import CountrySchema from "../dataAccess/schemas/implementation/CountrySchema";
import CountryRepository from "../repositories/CountryRepository";

export default class CountryService {
  repository: any;

  constructor() {
    this.repository = new CountryRepository();
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async filterWithPattern(pattern: string, keyToFind: string) {
    return await this.repository.filterWithPattern(pattern, keyToFind);
  }
}
