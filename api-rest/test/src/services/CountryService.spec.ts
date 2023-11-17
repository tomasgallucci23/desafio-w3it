import CountryService from "../../services/implementations/CountryService";
import { ICountryDTO } from "../../../src/dataAccess/dto/abstracts/ICountryDTO";
import { CountryDTO } from "../../../src/dataAccess/dto/implementations/CountryDTO";
// @ts-ignore
import { GetRandomCountries } from "../../mocks/CountryMock";

describe("CountryService", () => {
  let countryService: CountryService;

  beforeEach(() => {
    countryService = new CountryService();
  });

  it("should return all countries", async () => {
    const mockCountries: ICountryDTO = new CountryDTO(GetRandomCountries(2));
    jest
      .spyOn(CountryService.prototype, "getAll")
      .mockResolvedValue(mockCountries);

    const result = await countryService.getAll();

    expect(result).toEqual(mockCountries);
    expect(result.total).toEqual(mockCountries.total);
  });

  it("should filter countries with a pattern", async () => {
    const mockFilteredCountries: ICountryDTO = new CountryDTO(
      GetRandomCountries(5)
    );
    const countryName = mockFilteredCountries.countries[2].name;

    jest
      .spyOn(CountryService.prototype, "filterWithPattern")
      .mockResolvedValue(mockFilteredCountries);

    const keyToFind = "name";

    const result = await countryService.filterWithPattern(
      countryName,
      keyToFind
    );

    expect(result).toEqual(mockFilteredCountries);
    expect(result.total).toEqual(mockFilteredCountries.total);
  });
});
