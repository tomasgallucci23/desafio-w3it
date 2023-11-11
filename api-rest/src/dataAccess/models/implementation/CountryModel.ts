import ICountryModel from "../abstracts/ICountryModel";

export default class CountryModel implements ICountryModel {
  _id: string;
  name: string;
  population: number;

  constructor(id: string, name: string, population: number) {
    this._id = id;
    this.name = name;
    this.population = population;
  }
}
