import { Filter } from "./filter";
import { Search } from "./search";

export const HomePage = () => {
  return (
    <>
      <section>
        <Search />
        <Filter />
      </section>
    </>
  );
};
