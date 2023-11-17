import mongoose from "mongoose";
import environment from "../config/environment";
export async function MongooseLoader(global: any) {
  const {
    mongo: { uri },
  } = environment;
  console.log("Initalize Mongoose loader", uri);
  await mongoose.connect(uri);

  console.log("DB is connected");

  console.log("Finalize Mongoose loader");
}
