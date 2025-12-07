"server only";

import {
  getCountries,
  getCountriesByName,
  getCountriesByRegion,
} from "@yusifaliyevpro/countries";
import { Region } from "@yusifaliyevpro/countries/types";

export type Regions = Region | "";

const fields = ["name", "population", "flags"] as const;
const params = { independant: true, fields };

export const loadCountries = async ({
  country = "",
  region = "",
}: {
  country: string;
  region?: Regions;
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
    fields,
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
