"use cache";
import { Regions } from "@/app/lib/countries";
import { Suspense } from "react";
import { CountriesList } from "./countries/countries-list";
import { CountriesPlaceHolder } from "./countries/country-placeholder";
import { Filter } from "./filter";
import { Search } from "./search";

export const HomePage = async (props: {
  country?: string;
  region: Regions;
  page?: string;
}) => {
  const { country = "", region = "", page = "" } = props;
  return (
    <>
      <section className="my-8 flex justify-between flex-wrap gap-8">
        <Search country={country} />
        <Filter region={region} />
      </section>
      <section className="p-8 grid gap-8 sm:grid-cols-2 sm:px-0 md:grid-cols-3 lg:grid-cols-4 text-[.875rem]">
        <h2 className="sr-only">List of countries</h2>

        <Suspense
          key={country + region + page}
          fallback={<CountriesPlaceHolder />}
        >
          <CountriesList {...props} />
        </Suspense>
      </section>
    </>
  );
};
