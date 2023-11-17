import ICountryModel from "../abstracts/ICountryModel";

export default class CountryModel implements ICountryModel {
  _id: number;
  name: string;
  population: number;

  constructor(id: number, name: string, population: number) {
    this._id = id;
    this.name = name;
    this.population = population;
  }
}
