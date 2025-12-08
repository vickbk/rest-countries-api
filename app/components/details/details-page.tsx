import Image from "next/image";
import { SROnly } from "../shared/SROnly";
import { CountryDetails } from "./country-details";
import { BorderCountries } from "./border-countries";

export const DetailsPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <article className="grid gap-8 lg:gap-32 lg:grid-cols-2 lg:items-center grow">
      <div>
        <Image
          src={"https://flagcdn.com/az.svg"}
          width={1200}
          height={600}
          alt="Sample image"
        />
      </div>
      <section className="grid gap-8 sm:grid-cols-2">
        <h2 className="text-2xl font-semibold sm:col-span-full">
          <SROnly>Visited Country:</SROnly>The country
        </h2>
        <CountryDetails />
        <CountryDetails />
        <BorderCountries />
      </section>
    </article>
  );
};
