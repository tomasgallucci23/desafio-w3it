import CountryService from "../../src/services/CountryService";
import CountryModel from "../../src/dataAccess/models/implementation/CountryModel";
import CountryRepository from "../../src/repositories/CountryRepository";
import ICountryModel from "../../src/dataAccess/models/abstracts/ICountryModel";
import ICountrySchema from "../../src/dataAccess/schemas/abstracts/ICountrySchema";
import CountrySchema from "../../src/dataAccess/schemas/implementation/CountrySchema";

describe("CountryService", () => {
  let countryService: CountryService;

  beforeEach(() => {
    countryService = new CountryService();
  });

  it("should return all countries", async () => {
    const mockCountries = [
      new CountrySchema({
        _id: "1",
        name: "Country 1",
        population: 100,
      }),
      new CountrySchema({
        _id: "2",
        name: "Country 2",
        population: 200,
      }),
    ];

    jest
      .spyOn(CountryRepository.prototype, "getAll")
      .mockResolvedValue(mockCountries);

    const result = await countryService.getAll();

    expect(result).toEqual(mockCountries);
  });

  it("should filter countries with a pattern", async () => {
    const mockFilteredCountries = [
      new CountrySchema({
        _id: "1",
        name: "Filtered Country 1",
        population: 100,
      }),
    ];

    jest
      .spyOn(CountryRepository.prototype, "filterWithPattern")
      .mockResolvedValue(mockFilteredCountries);

    const pattern = "Filtered";
    const keyToFind = "name";

    const result = await countryService.filterWithPattern(pattern, keyToFind);

    expect(result).toEqual(mockFilteredCountries);
  });
});
