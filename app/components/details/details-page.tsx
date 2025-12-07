import Link from "next/link";
import { Icon } from "../common/icon";
import Image from "next/image";
import { SROnly } from "../shared/SROnly";
import { CountryDetails } from "./country-details";
import { BorderCountries } from "./border-countries";

export const DetailsPage = () => {
  return (
    <section className="px-4">
      <Link
        className="inline-block my-8 outstand p-2 px-8 rounded-lg"
        href={"/"}
      >
        {" "}
        <Icon name="arrow-left mr-4" /> Back
      </Link>
      <article className="grid gap-8">
        <div>
          <Image
            src={"https://flagcdn.com/az.svg"}
            width={1200}
            height={600}
            alt="Sample image"
          />
        </div>
        <section className="grid gap-8">
          <h2 className="text-2xl font-semibold">
            <SROnly>Visited Country:</SROnly>The country
          </h2>
          <CountryDetails />
          <CountryDetails />
          <BorderCountries />
        </section>
      </article>
    </section>
  );
};
