"server only";

import {
  getAllCountries,
  getCountriesByRegion,
  restCountries,
} from "@/infrastructure/countries";
import { RestCountries } from "@yusifaliyevpro/countries";
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
const params = { independant: true, fields };

const rest = new RestCountries({ apiKey: process.env.RESTCOUNTRIES_API_KEY! });
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

export const loadAllCountries = async () => {
  const [independant, dependant] = await Promise.all([
    rest.getCountries({
      ...params,
    }),
    rest.getCountries({
      ...params,
      filters: {
        classification: {
          dependency: true,
        },
      },
    }),
  ]);

  return [...(independant?.countries || []), ...(dependant?.countries || [])];
};
