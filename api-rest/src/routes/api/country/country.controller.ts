import { Request, Response } from "express";
import CountryService from "../../../services/implementations/CountryService";
const countryService = new CountryService();

export const getAllCountrys = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const result = await countryService.getAll();

  return res.status(200).json(result);
};

export const filterCountry = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { country } = req.query;
  const countryPattern = country?.toString() || "";
  if (countryPattern?.length < 3) {
    return res.sendStatus(204);
  }

  const result = await countryService.filterWithPattern(countryPattern, "name");

  return res.status(200).json(result);
};
