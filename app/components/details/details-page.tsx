import { loadCountries } from "@/app/lib/countries";
import {
  CountryDetailsType,
  getCountryDetails,
} from "@/app/lib/country-details";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SROnly } from "../shared/SROnly";
import { BorderCountries } from "./border-countries";
import { BorderPlaceholder } from "./border-placeholder";
import { CountryDetails } from "./country-details";

export const DetailsPage = async ({ country }: { country: string }) => {
  const [selected] =
    ((await loadCountries({
      country,
      fullText: true,
      additionalFields: [
        "borders",
        "subregion",
        "tlds",
        "currencies",
        "languages",
      ],
    })) as CountryDetailsType[]) || [];

  if (!selected) notFound();
  const { flag, names, borders } = selected;

  const { primaryDetails, moreDetails } = getCountryDetails({
    country: selected,
  });

  return (
    <article className="grid gap-8 lg:gap-32 lg:grid-cols-2 lg:items-center grow lg:pb-16">
      <div>
        <Image
          src={flag.url_svg}
          width={1200}
          height={600}
          alt={flag.description || `${names.common}'s flag`}
        />
      </div>
      <section className="grid gap-8 sm:grid-cols-2">
        <h2 className="text-2xl font-semibold sm:col-span-full">
          <SROnly>Visited Country:</SROnly>
          {names.common}
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
