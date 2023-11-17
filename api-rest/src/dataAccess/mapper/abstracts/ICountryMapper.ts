import { ICountryDTO } from "../../dto/abstracts/ICountryDTO";
import ICountryModel from "../../models/abstracts/ICountryModel";
import { ICountrySeedModel } from "../../models/abstracts/ICountrySeedModel";
import ICountrySchema from "../../schemas/abstracts/ICountrySchema";

export interface ICountryMapper {
  fromMongooseToModel(instance: ICountrySchema): ICountryModel;
  fromModelToMongoose(instance: ICountryModel): ICountrySchema;
  fromModelsToDTO(instances: ICountryModel[]): ICountryDTO;
  fromSeedToMongoose(instance: ICountrySeedModel): ICountrySchema;
}
