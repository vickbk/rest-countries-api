"server only";

import { getCountries, getCountriesByName } from "@yusifaliyevpro/countries";

const fields = ["name", "population", "flags"] as const;
const params = { independant: true, fields };

export const loadCountries = async (query: string) => {
  if (query === "") {
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
    name: query,
    fields,
  });
};
