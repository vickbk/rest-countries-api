import Link from "next/link";
import { Icon } from "../common/icon";
import Image from "next/image";
import { SROnly } from "../shared/SROnly";
import { CountryDetails } from "./country-details";
import { BorderCountries } from "./border-countries";

export const DetailsPage = () => {
  return (
    <>
      <Link href={"/"}>
        {" "}
        <Icon name="arrow-left" /> Back
      </Link>
      <article>
        <div>
          <Image
            src={"https://flagcdn.com/az.svg"}
            width={1200}
            height={600}
            alt="Sample image"
          />
        </div>
        <section>
          <h2>
            <SROnly>Visited Country:</SROnly>The country
          </h2>
          <CountryDetails />
          <CountryDetails />
          <BorderCountries />
        </section>
      </article>
    </>
  );
};
