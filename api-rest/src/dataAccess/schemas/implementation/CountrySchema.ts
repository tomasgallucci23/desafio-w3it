import { Schema, model } from "mongoose";
import ICountrySchema from "../abstracts/ICountrySchema";

const schema = new Schema<ICountrySchema>({
  name: String,
  population: Number,
});

const CountrySchema = model("CountrySchema", schema);

export default CountrySchema;
