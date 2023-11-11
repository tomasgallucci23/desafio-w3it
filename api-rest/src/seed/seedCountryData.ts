const countriesData = [
  { name: "India", population: 1409902000 },
  { name: "China", population: 1403426000 },
  { name: "Estados Unidos", population: 331800000 },
  { name: "Indonesia", population: 271629000 },
  { name: "Pakistán", population: 224654000 },
  { name: "Nigeria", population: 219743000 },
  { name: "Brasil", population: 211420000 },
  { name: "Bangladés", population: 181781000 },
  { name: "Rusia", population: 146712000 },
  { name: "México", population: 127792000 },
  { name: "Japón", population: 126045000 },
  { name: "Filipinas", population: 108772000 },
  { name: "Egipto", population: 101000000 },
  { name: "Etiopía", population: 100882000 },
  { name: "Vietnam", population: 97591000 },
  { name: "República del Congo", population: 89561000 },
  { name: "Irán", population: 83914000 },
  { name: "Turquía", population: 83752000 },
  { name: "Alemania", population: 83421000 },
  { name: "Tailandia", population: 68232000 },
];

import CountrySchema from "../dataAccess/schemas/implementation/CountrySchema";

export async function seedCountryData() {
  try {
    await CountrySchema.deleteMany({}); // Elimina todos los registros existentes

    await CountrySchema.insertMany(countriesData); // Inserta los nuevos datos
  } catch (err) {
    console.error("Error al insertar datos:", err);
  }
}
