import { MigrationInterface } from "mongo-migrate-ts";
import { Db } from "mongodb";
import CountrySchema from "../src/dataAccess/schemas/implementation/CountrySchema";
import environment from "../src/config/environment";
import mongoose from "mongoose";

const {
  mongo: { uri },
} = environment;

if (!mongoose.connections.length) {
  mongoose.connect(uri).then(() => {
    console.log("DB is connected and ready to run migrates");
  });
}

const UNIQUE_INDEX_NAME = "name_i";

export class AddIndexCountrySchema1700163460541 implements MigrationInterface {
  async up(db: Db): Promise<any> {
    try {
      await db
        .collection("countryschemas")
        .createIndex({ name: 1 }, { name: UNIQUE_INDEX_NAME });
      console.log("Index added successfull");
    } catch (err) {
      console.error(err);
    }
  }

  async down(db: Db): Promise<any> {
    try {
      await db.collection("countryschemas").dropIndex(UNIQUE_INDEX_NAME);

      console.log("Index removed successfull");
    } catch (err) {
      console.error(err);
    }
  }
}
