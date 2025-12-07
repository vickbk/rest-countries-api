import { SROnly } from "../shared/SROnly";
import { Country } from "./countries/country";
import { Filter } from "./filter";
import { Search } from "./search";

export const HomePage = () => {
  return (
    <>
      <section className="my-8 flex justify-between flex-wrap gap-8">
        <Search />
        <Filter />
      </section>
      <section className="p-8 grid gap-8 sm:grid-cols-2 sm:px-0 md:grid-cols-3 lg:grid-cols-4">
        <SROnly>List of countries</SROnly>
        {[1, 2, 3, 4].map((_, key) => (
          <Country key={key} />
        ))}
      </section>
    </>
  );
};
