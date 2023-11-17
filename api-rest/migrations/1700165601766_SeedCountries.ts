import { MigrationInterface } from "mongo-migrate-ts";
import { Db } from "mongodb";
import environment from "../src/config/environment";
import mongoose from "mongoose";

const {
  mongo: { uri },
} = environment;

if (!mongoose.connections.length) {
  console.log(uri);
  mongoose.connect(uri).then(() => {
    console.log("DB is connected and ready to run migrates");
  });
}

const countriesData = [
  { id: 1, name: "India", population: 1409902000 },
  { id: 2, name: "China", population: 1403426000 },
  { id: 3, name: "Estados Unidos", population: 331800000 },
  { id: 4, name: "Indonesia", population: 271629000 },
  { id: 5, name: "Pakistán", population: 224654000 },
  { id: 6, name: "Nigeria", population: 219743000 },
  { id: 7, name: "Brasil", population: 211420000 },
  { id: 8, name: "Bangladés", population: 181781000 },
  { id: 9, name: "Rusia", population: 146712000 },
  { id: 10, name: "México", population: 127792000 },
  { id: 11, name: "Japón", population: 126045000 },
  { id: 12, name: "Filipinas", population: 108772000 },
  { id: 13, name: "Egipto", population: 101000000 },
  { id: 14, name: "Etiopía", population: 100882000 },
  { id: 15, name: "Vietnam", population: 97591000 },
  { id: 16, name: "República del Congo", population: 89561000 },
  { id: 17, name: "Irán", population: 83914000 },
  { id: 18, name: "Turquía", population: 83752000 },
  { id: 19, name: "Alemania", population: 83421000 },
  { id: 20, name: "Tailandia", population: 68232000 },
];

import CountryMapper from "../src/dataAccess/mapper/implementations/CountryMapper";
import { ICountryMapper } from "../src/dataAccess/mapper/abstracts/ICountryMapper";
import ICountrySchema from "../src/dataAccess/schemas/abstracts/ICountrySchema";

export class SeedCountries1700165601766 implements MigrationInterface {
  mapper: ICountryMapper;

  constructor() {
    this.mapper = new CountryMapper();
  }

  async up(db: Db): Promise<any> {
    try {
      const mappedData = countriesData.map((country) =>
        this.mapper.fromSeedToMongoose(country)
      );
      await db
        .collection<ICountrySchema>("countryschemas")
        .insertMany(mappedData);
    } catch (err) {
      console.error(err);
    }
  }

  async down(db: Db): Promise<any> {
    try {
      await db.collection("countryschemas").deleteMany({});
    } catch (err) {
      console.error(err);
    }
  }
}
