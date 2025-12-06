import { SROnly } from "../shared/SROnly";
import { Country } from "./countries/country";
import { Filter } from "./filter";
import { Search } from "./search";

export const HomePage = () => {
  return (
    <>
      <section>
        <Search />
        <Filter />
      </section>
      <section>
        <SROnly>List of countries</SROnly>
        <Country />
      </section>
    </>
  );
};
