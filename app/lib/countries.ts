"server only";

import {
  getAllCountries,
  getCountriesByRegion,
  restCountries,
} from "@/infrastructure/countries";
import {
  Cca3Code,
  Country,
  CountryPicker,
  Region,
} from "@yusifaliyevpro/countries/types";

export type Regions = Region | "";

export type CountryType<T extends readonly (keyof Country)[] = []> =
  CountryPicker<T>;

const fields = ["names", "population", "flag", "capitals", "region"] as const;

export const loadCountries = async ({
  country,
  region = "",
  ...options
}: {
  country?: string;
  region?: Regions;
  fullText?: boolean;
  additionalFields?: (keyof Country)[];
}) => {
  if (region !== "") return await getCountriesByRegion({ region, country });
  return await getAllCountries({ q: country, ...options });
};

export const loadCountriesByTag = async ({ code }: { code: Cca3Code }) => {
  const { country, success, error } = await restCountries.getCountryByCode({
    alpha_3: code,
    fields,
  });

  if (success) return country;

  throw error;
};
