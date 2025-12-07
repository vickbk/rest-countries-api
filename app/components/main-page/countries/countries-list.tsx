import { loadCountries, Regions } from "@/app/lib/countries";
import { Country } from "./country";

export const CountriesList = async ({
  country = "",
  region = "",
}: {
  country?: string;
  page?: string;
  region: Regions;
}) => {
  const countries = (await loadCountries({ country, region })) || [];
  return countries.map((_, key) => <Country key={key} />);
};
