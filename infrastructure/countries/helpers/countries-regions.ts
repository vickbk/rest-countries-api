import { fields, restCountries } from "../client";
import { RegionParams } from "../types";

export async function getCountriesByRegion({
  country = "",
  region,
  page = 0,
}: RegionParams) {
  const limit = 12;
  const results = await restCountries.getCountriesByRegion({
    region,
    fields,
    limit,
    offset: page * limit,
  });

  const countryFilter = country.toLowerCase();
  results.countries = results.countries?.filter(
    ({ names: { common, official } }) =>
      common.toLowerCase().indexOf(countryFilter) !== -1 ||
      official.toLowerCase().indexOf(countryFilter) !== -1,
  );
  return results;
}
