import { loadCountries, Regions } from "@/app/lib/countries";
import { Country } from "./country";
import { PagingWrapper } from "./paging-wrapper";

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
  const {
    success,
    countries = [],
    meta,
  } = await loadCountries({ country, region });

  const totalPages = Math.ceil((meta?.total ?? 0) / PAGESIZE);

  if (!success) return null;
  return (
    <>
      {countries.map((country, key) => (
        <Country key={key} country={country} />
      ))}
      <PagingWrapper page={+page} totalPages={totalPages} />
    </>
  );
};
