import { loadCountries, Regions } from "@/app/lib/countries";
import { Country } from "./country";
import { Paging } from "../paging";

const PAGESIZE = 12;

export const CountriesList = async ({
  country = "",
  region = "",
  page = "1",
}: {
  country?: string;
  page?: string;
  region: Regions;
}) => {
  const countries = (await loadCountries({ country, region })) || [];
  const totalPages = Math.ceil(countries.length / PAGESIZE);
  const countriesPage = countries.slice(
    (+page - 1) * PAGESIZE,
    +page * PAGESIZE
  );
  return (
    <>
      {countriesPage.map((_, key) => (
        <Country key={key} />
      ))}
      {totalPages > 1 && <Paging page={+page} totalPages={totalPages} />}
    </>
  );
};
