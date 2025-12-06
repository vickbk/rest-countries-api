import { SROnly } from "../shared/SROnly";
import { Country } from "./countries/country";
import { Filter } from "./filter";
import { Search } from "./search";

export const HomePage = () => {
  return (
    <>
      <section className="my-8 flex flex-wrap gap-8">
        <Search />
        <Filter />
      </section>
      <section className="p-8">
        <SROnly>List of countries</SROnly>
        <Country />
      </section>
    </>
  );
};
