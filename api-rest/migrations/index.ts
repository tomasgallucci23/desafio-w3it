import { mongoMigrateCli } from "mongo-migrate-ts";
import environment from "../src/config/environment";

const {
  mongo: { uri },
} = environment;

mongoMigrateCli({
  uri,
  migrationsDir: __dirname,
  migrationsCollection: "migrations",
});
