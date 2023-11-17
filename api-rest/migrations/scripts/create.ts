import { MigrationInterface } from "mongo-migrate-ts";
import { Db } from "mongodb";
import environment from "../../src/config/environment";
import mongoose from "mongoose";

const {
  mongo: { uri },
} = environment;

if (!mongoose.connections.length) {
  mongoose.connect(uri).then(() => {
    console.log("DB is connected and ready to run migrates");
  });
}

export class MyMigration implements MigrationInterface {
  async up(db: Db): Promise<any> {}

  async down(db: Db): Promise<any> {}
}
