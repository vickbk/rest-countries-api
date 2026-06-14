import { fields, restCountries } from "../client";
import { RegionParams } from "../types";

export async function getCountriesByRegion({
  country = "",
  region,
}: RegionParams) {
  const { countries, success, error } =
    await restCountries.getCountriesByRegion({
      region,
      fields: fields,
      limit: 20,
      offset: 1,
    });

  if (!success) throw error;
  const countryFilter = country.toLowerCase();
  return countries.filter(
    ({ names: { common, official } }) =>
      common.toLowerCase().indexOf(countryFilter) !== -1 ||
      official.toLowerCase().indexOf(countryFilter) !== -1,
  );
}
