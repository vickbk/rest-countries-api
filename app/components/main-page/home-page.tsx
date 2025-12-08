import { Suspense } from "react";
import { SROnly } from "../shared/SROnly";
import { CountriesPlaceHolder } from "./countries/country-placeholder";
import { Filter } from "./filter";
import { Search } from "./search";
import { CountriesList } from "./countries/countries-list";
import { Regions } from "@/app/lib/countries";

export const HomePage = (props: {
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
        <SROnly>List of countries</SROnly>

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
