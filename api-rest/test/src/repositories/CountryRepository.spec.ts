import mongoose, { Mongoose } from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import CountrySchema from "../../../src/dataAccess/schemas/implementation/CountrySchema";
import CountryRepository from "../../../src/repositories/implements/CountryRepository";

describe("CountryRepository", () => {
  let mongoServer: MongoMemoryServer;
  let conn: Mongoose;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    conn = await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await conn?.disconnect();
    await mongoServer?.stop();
  });

  afterEach(async () => {
    await mongoose?.connection.dropDatabase();
  });

  it("should return all countries", async () => {
    const countryData = [
      { name: "Country1", population: 100 },
      { name: "Country2", population: 200 },
    ];

    await CountrySchema.insertMany(countryData);

    const countryRepository = new CountryRepository();
    const result = await countryRepository.getAll();

    expect(result).toHaveLength(countryData.length);
    expect(result[0].name).toBe(countryData[0].name);
    expect(result[1].name).toBe(countryData[1].name);
  });

  it("should filter countries with a pattern", async () => {
    const countryData = [
      { name: "Country1", population: 100 },
      { name: "FilteredCountry", population: 150 },
    ];

    await CountrySchema.insertMany(countryData);

    const countryRepository = new CountryRepository();
    const pattern = "Filtered";
    const keyToFind = "name";
    const cond = {
      [keyToFind]: new RegExp(pattern, "i"),
    };

    const result = await countryRepository.filter(
      cond,
      { _id: 1, name: 1, population: 1 },
      { limit: 5 }
    );

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("FilteredCountry");
  });
});
