export default interface ICountrySchema extends Document {
  _id: string;
  name: string;
  population: number;
}
