import mongoose from "mongoose";
import CountrySchema from "../dataAccess/schemas/implementation/CountrySchema";

export default class CountryRepository {
  async getAll() {
    return await CountrySchema.find({}, { _id: 1, name: 1, population: 1 });
  }

  async filterWithPattern(pattern: string, keyToFind: string) {
    return await CountrySchema.find(
      { [keyToFind]: new RegExp(pattern, "i") },
      { _id: 1, name: 1, population: 1 },
      { limit: 5 }
    );
  }
}
