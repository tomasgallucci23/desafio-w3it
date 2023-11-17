import ICountryModel from "../../src/dataAccess/models/abstracts/ICountryModel";
import CountryModel from "../../src/dataAccess/models/implementation/CountryModel";

// Array of country names
const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
];

function getRandomCountry(): string {
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
}

function getRandomNumber(): number {
  return Math.floor(Math.random() * 10000) + 1;
}

const GetRandomCountries = (maxCount: number = 5) => {
  const countries: ICountryModel[] = [];
  for (let index = 1; index <= maxCount; index++) {
    countries.push(
      new CountryModel(index, getRandomCountry(), getRandomNumber())
    );
  }
  return countries;
};

export { GetRandomCountries };
