import ICountryModel from "../models/abstracts/ICountryModel";
import CountryModel from "../models/implementation/CountryModel";
import ICountrySchema from "../schemas/abstracts/ICountrySchema";
import CountrySchema from "../schemas/implementation/CountrySchema";

export default class CountryMapper {
  fromMongooseToModel(instance: ICountrySchema): ICountryModel {
    return new CountryModel(instance._id, instance.name, instance.population);
  }

  fromModelToMongoose(instance: ICountryModel): ICountrySchema {
    return new CountrySchema({
      _id: instance._id,
      name: instance.name,
      population: instance.population,
    });
  }
}
