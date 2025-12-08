"server only";

import {
  getCountries,
  getCountriesByCodes,
  getCountriesByName,
  getCountriesByRegion,
} from "@yusifaliyevpro/countries";
import {
  Cca3Code,
  Country,
  CountryPicker,
  Region,
} from "@yusifaliyevpro/countries/types";

export type Regions = Region | "";

export type CountryType<T extends readonly (keyof Country)[] = []> =
  CountryPicker<T>;

const fields = ["name", "population", "flags", "capital", "region"] as const;
const params = { independant: true, fields };

export const loadCountries = async ({
  country = "",
  region = "",
  fullText = false,
  additionalFields = [],
}: {
  country: string;
  region?: Regions;
  fullText?: boolean;
  additionalFields?: (keyof Country)[];
}) => {
  if (region !== "") return loadCountriesByRegion({ region, country });
  if (country === "") {
    const [independant, dependant] = await Promise.all([
      getCountries({
        ...params,
      }),
      getCountries({
        ...params,
        independent: false,
      }),
    ]);
    return [...(independant || []), ...(dependant || [])];
  }
  return await getCountriesByName({
    name: country,
    fields: [...fields, ...additionalFields],
    fullText,
  });
};

const loadCountriesByRegion = async ({
  country = "",
  region,
}: {
  country?: string;
  region: Region;
}) => {
  const countries =
    (await getCountriesByRegion({
      region,
      fields,
    })) || [];

  return countries.filter(
    ({ name: { common, official } }) =>
      common.toLowerCase().indexOf(country.toLowerCase()) !== -1 ||
      official.toLowerCase().indexOf(country.toLowerCase()) !== -1
  );
};

export const loadCountriesByTag = async ({ codes }: { codes: Cca3Code[] }) => {
  const countries = await getCountriesByCodes({
    codes,
    fields,
  });
  return countries;
};
