import mongoose from "mongoose";
import CountrySchema from "../../dataAccess/schemas/implementation/CountrySchema";
import ICountryModel from "../../dataAccess/models/abstracts/ICountryModel";
import { ICountryRepository } from "../abstracts/ICountryRepository";

export default class CountryRepository implements ICountryRepository {
  async getAll(): Promise<ICountryModel[]> {
    return await CountrySchema.find({}, { _id: 1, name: 1, population: 1 });
  }

  async filter(
    condition: object,
    filter: object,
    options: object
  ): Promise<ICountryModel[]> {
    return await CountrySchema.find(condition, filter, options);
  }
}
