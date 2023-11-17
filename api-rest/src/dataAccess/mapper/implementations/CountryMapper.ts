import { ICountryDTO } from "../../dto/abstracts/ICountryDTO";
import { CountryDTO } from "../../dto/implementations/CountryDTO";
import ICountryModel from "../../models/abstracts/ICountryModel";
import { ICountrySeedModel } from "../../models/abstracts/ICountrySeedModel";
import CountryModel from "../../models/implementation/CountryModel";
import ICountrySchema from "../../schemas/abstracts/ICountrySchema";
import CountrySchema from "../../schemas/implementation/CountrySchema";
import { ICountryMapper } from "../abstracts/ICountryMapper";

export default class CountryMapper implements ICountryMapper {
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

  fromModelsToDTO(instances: ICountryModel[]): ICountryDTO {
    return new CountryDTO(instances);
  }

  fromSeedToMongoose(instance: ICountrySeedModel): ICountrySchema {
    return new CountrySchema({
      _id: instance.id,
      name: instance.name,
      population: instance.population,
    });
  }
}
