import { Request, Response } from "express";
import CountrySchema from "../../../dataAccess/schemas/implementation/CountrySchema";
import CountryService from "../../../services/CountryService";
import CountryModel from "../../../dataAccess/models/implementation/CountryModel";
import CountryMapper from "../../../dataAccess/mapper/CountryMapper";
import ICountrySchema from "../../../dataAccess/schemas/abstracts/ICountrySchema";
const countryService = new CountryService();
const countryMapped = new CountryMapper();

export const getAllCountrys = async (req: Request, res: Response) => {
  const result = await countryService.getAll();
  const dataMapped = result.map((country: ICountrySchema) =>
    countryMapped.fromModelToMongoose(country)
  );
  return res.status(200).json(dataMapped);
};

export const filterCountry = async (req: Request, res: Response) => {
  const { country } = req.query;
  const countryPattern = country?.toString() || "";
  if (countryPattern?.length < 3) {
    return res.sendStatus(204);
  }

  const result = await countryService.filterWithPattern(countryPattern, "name");
  const dataMapped = result.map((country: ICountrySchema) =>
    countryMapped.fromModelToMongoose(country)
  );
  return res.status(200).json(dataMapped);
};
