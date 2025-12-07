import { loadCountries } from "@/app/lib/countries";
import { Country } from "./country";

export const CountriesList = async ({
  country,
}: {
  country: string;
  page?: string;
}) => {
  const countries = (await loadCountries(country)) || [];
  return countries.map((_, key) => <Country key={key} />);
};
