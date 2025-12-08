import Image from "next/image";
import { SROnly } from "../shared/SROnly";
import { CountryDetails } from "./country-details";
import { BorderCountries } from "./border-countries";
import { loadCountries } from "@/app/lib/countries";
import { notFound } from "next/navigation";
import {
  CountryDetailsType,
  getCountryDetails,
} from "@/app/lib/country-details";
import { Suspense } from "react";
import { BorderPlaceholder } from "./border-placeholder";

export const DetailsPage = async ({ country }: { country: string }) => {
  const [selected] =
    ((await loadCountries({
      country,
      fullText: true,
      additionalFields: [
        "borders",
        "subregion",
        "tld",
        "currencies",
        "languages",
      ],
    })) as CountryDetailsType[]) || [];
  if (!selected) notFound();
  const { flags, name, borders } = selected;

  const { primaryDetails, moreDetails } = getCountryDetails({
    country: selected,
  });

  return (
    <article className="grid gap-8 lg:gap-32 lg:grid-cols-2 lg:items-center grow">
      <div>
        <Image
          src={flags.svg}
          width={1200}
          height={600}
          alt={flags.alt || `${name.common}'s flag`}
        />
      </div>
      <section className="grid gap-8 sm:grid-cols-2">
        <h2 className="text-2xl font-semibold sm:col-span-full">
          <SROnly>Visited Country:</SROnly>
          {name.common}
        </h2>
        <CountryDetails title="Primary details" details={primaryDetails} />
        <CountryDetails title="More details" details={moreDetails} />
        <Suspense
          key={borders?.join("") || "borders"}
          fallback={<BorderPlaceholder />}
        >
          <BorderCountries borders={borders} />
        </Suspense>
      </section>
    </article>
  );
};
